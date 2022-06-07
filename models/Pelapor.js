const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pelaporSchema = new mongoose.Schema({
  nohp: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  usia: {
    type: String,
    required: true,
  },
  tglvaksin1: {
    type: String,
    required: true,
  },
  categoryId1: {
    type: ObjectId,
    ref: "Category",
  },
  tmptvaksin1: {
    type: String,
    required: true,
  },
  about1: {
    type: String,
    required: true,
  },
  tglvaksin2: {
    type: String,
    required: true,
  },
  categoryId2: {
    type: ObjectId,
    ref: "Category",
  },
  tmptvaksin2: {
    type: String,
    required: true,
  },
  about2: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  respon: {
    type: String,
    default: "Belum direspon",
  },
  statusRespon: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Pelapor", pelaporSchema);
