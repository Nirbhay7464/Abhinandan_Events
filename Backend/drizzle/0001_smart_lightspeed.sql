CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"preferred_contact" text,
	"event_type" text,
	"guest_count" integer,
	"event_date" date,
	"budget" text,
	"venue" text,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "images" SET DATA TYPE jsonb;