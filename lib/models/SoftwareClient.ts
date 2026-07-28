// models/SoftwareClient.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ISoftwareClient extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;

  softwareId: string;
  softwareName: string;

  plan: "Basic" | "Business" | "Enterprise";
  source: string;

  contractStartDate: Date;
  contractEndDate: Date;

  status: "active" | "inactive";

  notes?: string;
}

const SoftwareClientSchema = new Schema(
  {
    // Client Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // Software Information
    softwareId: {
      type: String,

    },

    softwareName: {
      type: String,
      required: true,
      enum: [
       "CyberProjects",
  "CyberInvoice",
  "CyberLedger",
  "CyberPayroll",
  "CyberRetail",
  "CyberClinic",
  "CyberPharma",
  "CyberDine",
      ],
    },

    plan: {
      type: String,
      enum: [
        "Basic",
        "Business",
        "Enterprise",
      ],
      required: true,
    },

    source: {
      type: String,
      default: "",
    },

    contractStartDate: {
      type: Date,
      required: true,
    },

    contractEndDate: {
      type: Date,
      required: true,
    },

    tenure: {
      type: String,
      enum: ["monthly", "yearly","lifetime"],
      default: "monthly",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SoftwareClient ||
  mongoose.model<ISoftwareClient>(
    "SoftwareClient",
    SoftwareClientSchema
  );