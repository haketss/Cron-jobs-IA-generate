CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "elementos" ADD COLUMN "quemCriou" text;--> statement-breakpoint
ALTER TABLE "elementos" ADD COLUMN "emojeBaseUm" text;--> statement-breakpoint
ALTER TABLE "elementos" ADD COLUMN "emojeBaseDois" text;