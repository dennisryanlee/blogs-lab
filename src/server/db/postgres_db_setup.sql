-- CREATE DATABASE "blogslab"

CREATE TABLE "authors" (
  "id" serial NOT NULL,
  "authorname" varchar(45) NOT NULL,
  "authorbio" varchar(500) NOT NULL,
  "email" varchar(45) NOT NULL UNIQUE,
  "password" varchar(60) NOT NULL,
  "_created" time DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
)

CREATE TABLE "blogs" (
  "id" serial NOT NULL,
  "title" varchar(45) NOT NULL,
  "content" varchar(1500) NOT NULL,
  "authorid" int NOT NULL ,
  "_created" time DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("authorid") REFERENCES "authors" ("id")
) 

CREATE TABLE "tags" (
  "id" serial NOT NULL,
  "tagname" varchar(45) NOT NULL,
  "_created" time DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
) 

CREATE TABLE "blogtags" (
  "blogid" int NOT NULL,
  "tagid" int NOT NULL,
  PRIMARY KEY ("blogid","tagid"),
  FOREIGN KEY ("tagid") REFERENCES "tags" ("id"),
  FOREIGN KEY ("blogid") REFERENCES "blogs" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)