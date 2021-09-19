import mongoose, { Schema } from 'mongoose';

export interface IPartner {
  _id?: string;
  ownerName: string;
  document: string;
  coverageArea: {
    _id?: string;
    type: string;
    coordinates: number[][][][];
  };
  address: {
    _id?: string;
    type: string;
    coordinates: number[];
  };
  created_at: Date | string;
  updated_at: Date | string;
}

const CoverageAreaSchema = new Schema({
  type: { type: String, required: true },
  coordinates: { type: [[[[Number]]]], required: true },
});

const AddressSchema = new Schema({
  type: { type: String, required: true },
  coordinates: { type: [Number], required: true }, // [Long, Lat]
});

const PartnerSchema = new Schema({
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  coverageArea: { type: CoverageAreaSchema, required: true },
  address: { type: AddressSchema, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

PartnerSchema.pre('save', function (next) {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

PartnerSchema.index({ 'address.coordinates': '2dsphere' });

export const Partner = mongoose.model<IPartner>('Partner', PartnerSchema);
