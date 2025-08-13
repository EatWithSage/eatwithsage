// Storage interface for the Sage marketing website
// Since this is a marketing site, we primarily need storage for demo form submissions

export interface IStorage {
  // Storage interface is minimal for this marketing site
  // All demo form submissions are handled via email
}

export class MemStorage implements IStorage {
  constructor() {
    // Marketing site doesn't require persistent storage
    // All lead capture is handled via email notifications
  }
}

export const storage = new MemStorage();
