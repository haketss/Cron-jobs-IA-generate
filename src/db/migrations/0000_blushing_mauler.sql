CREATE TABLE "elementos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"emoje" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
