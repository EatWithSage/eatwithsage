import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { demoFormSchema } from "@shared/schema";
import { sendEmail, createDemoEmailHTML } from "./services/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo form submission endpoint
  app.post("/api/email-demo", async (req, res) => {
    try {
      // Validate request body
      const validatedData = demoFormSchema.parse(req.body);
      
      console.log("Demo form submission received:", validatedData);
      
      // Create email content
      const emailHTML = createDemoEmailHTML(
        validatedData.firstName,
        validatedData.lastName,
        validatedData.email
      );
      
      // Send email to dave@eatwithsage.com with BCC to davidmillikenco@gmail.com
      const emailSent = await sendEmail({
        to: "dave@eatwithsage.com",
        bcc: "davidmillikenco@gmail.com",
        subject: `New Demo Request from ${validatedData.firstName} ${validatedData.lastName}`,
        html: emailHTML
      });
      
      if (!emailSent) {
        throw new Error("Failed to send email");
      }
      
      res.json({ 
        success: true, 
        message: "Demo request submitted successfully" 
      });
      
    } catch (error) {
      console.error("Demo form submission error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
