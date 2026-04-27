CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"content" text,
	"cover_image" text,
	"author" text DEFAULT 'Sage' NOT NULL,
	"tags" text[] DEFAULT '{}',
	"status" text DEFAULT 'draft' NOT NULL,
	"post_date" date,
	"published_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
