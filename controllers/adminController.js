const Category = require("../models/Category");
const Pelapor = require("../models/Pelapor");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const pelapor = await Pelapor.find()
        .populate({
          path: "categoryId1",
          select: "id name",
        })
        .populate({
          path: "categoryId2",
          select: "id name",
        });
      const category = await Category.find();
      res.render("admin/dashboard/view_dashboard", {
        title: "LAVAKBDG | Dashboard",
        category,
        pelapor,
      });
    } catch (error) {}
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });
      req.flash("alertMessage", `Succes Add ${name}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await category.remove();
      req.flash("alertMessage", `Succes delete`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();
      req.flash("alertMessage", `Succes edit ${name}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  viewCategory: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/category/view_category", {
        category,
        alert,
        title: "e-Footballers Edit",
      });
    } catch {
      res.redirect("/admin/category");
    }
  },

  viewPelapor: async (req, res) => {
    try {
      const pelapor = await Pelapor.find()
        .populate({
          path: "categoryId1",
          select: "id name",
        })
        .populate({
          path: "categoryId2",
          select: "id name",
        });

      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/pelapor/view_pelapor", {
        title: "LAVAKBDG | Pelapor",
        alert,
        category,
        pelapor,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pelapor");
    }
  },

  addPelapor: async (req, res) => {
    try {
      const {
        nohp,
        nama,
        jenisKelamin,
        usia,
        tglvaksin1,
        categoryId1,
        tmptvaksin1,
        about1,
        tglvaksin2,
        categoryId2,
        tmptvaksin2,
        about2,
        about,
      } = req.body;

      const category1 = await Category.findOne({ _id: categoryId1 });
      const category2 = await Category.findOne({ _id: categoryId2 });

      //  const categoryName = await Category.findOne({name: })

      const newItem = {
        nohp,
        nama,
        jenisKelamin,
        usia,
        tglvaksin1,
        categoryId1: category1._id,
        tmptvaksin1,
        about1,
        tglvaksin2,
        categoryId2: category2._id,
        tmptvaksin2,
        about2,
        about,
      };

      const pelapor = await Pelapor.create(newItem);
      category1.pelaporId.push({ _id: pelapor._id });
      category2.pelaporId.push({ _id: pelapor._id });

      await category1.save();
      await category2.save();
      await pelapor.save();

      console.log(pelapor);

      req.flash("alertMessage", `Succes Add ${nama}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/pelapor");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pelapor");
    }
  },

  responPelaporView: async (req, res) => {
    try {
      const { id } = req.params;
      const pelapor = await Pelapor.findOne({ _id: id })
        .populate({
          path: "categoryId1",
          select: "id name",
        })
        .populate({
          path: "categoryId2",
          select: "id name",
        });

      const category = await Category.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/pelapor/respon_pelapor", {
        title: "LAVAKBDG | Respon Pelapor",
        alert,
        pelapor,
        category,
      });
      req.flash("alertMessage", `Succes Add ${nama}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/pelapor");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pelapor");
    }
  },

  responPelapor: async (req, res) => {
    try {
      const { id } = req.params;
      const { respon1, statusRespon1 } = req.body;

      console.log(id, respon1, statusRespon1);

      const pelapor = await Pelapor.findOne({ _id: id });
      pelapor.respon = respon1;
      pelapor.statusRespon = statusRespon1;
      await pelapor.save();
      req.flash("alertMessage", `Succes respon ${pelapor.nama}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/pelapor");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/footballer");
    }
  },
};
