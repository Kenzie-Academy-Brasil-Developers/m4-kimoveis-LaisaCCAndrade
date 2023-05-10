import { Request, Response } from "express";
import { TCreateCategory } from "../interfaces/categories.interfaces";
import createCategoriesService from "../services/categories/createCategories.services";
import listCategoriesService from "../services/categories/listCategories.services";
import retrieveCategoriesService from "../services/categories/retrieveCategories.services";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCreateCategory = req.body;
  const newCategory = await createCategoriesService(categoryData);

  return res.status(201).json(newCategory);
};

const listCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = await listCategoriesService();

  return res.status(200).json(category);
};

const retrieveCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId = parseInt(req.params.id);   

  const estateIsTheCategory = await retrieveCategoriesService(categoryId);

  return res.json(estateIsTheCategory);
};

export {
  createCategoryController,
  listCategoryController,
  retrieveCategoryController,
};
