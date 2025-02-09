import createHttpError from 'http-errors';
import { addWater } from '../services/water.js';
import {
  deleteWater,
  getMonthWater,
  getWaterByDate,
  updateWater,
} from '../services/water.js';

export const addWaterController = async (req, res, next) => {
  const { drinkedWater, drinkTime } = req.body;
  const userId = req.user._id;

  const water = await addWater({ userId, drinkedWater, drinkTime });
  res.status(201).json({
    status: 201,
    message: 'Water added successfully',
    data: water,
  });
};

export const updateWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;
  const { drinkedWater, drinkTime } = req.body;
  const water = await updateWater(waterId, userId, {
    drinkedWater,
    drinkTime,
  });
  if (!water) {
    return next(createHttpError(404, 'Water not found'));
  }
  const status = water.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Water updated successfully',
    data: water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const userId = req.user._id;
  const { waterId } = req.params;
  const water = await deleteWater(waterId, userId);
  if (!water) {
    return next(createHttpError(404, 'Water not found'));
  }
  res.status(204).send();
};

export const getWaterByDateController = async (req, res, next) => {
  console.log('Отримані params:', req.params); // 🛑 Додай цей лог
  console.log('req.params.date:', req.params.date); // 🛑 Додай цей лог
  const userId = req.user._id;
  const { date } = req.params;
  if (!date) {
    return next(createHttpError(400, 'Date is required in params'));
  }
  const water = await getWaterByDate(date, userId);
  if (!water) {
    return next(createHttpError(404, `Water by date ${date} not found`));
  }
  res.status(200).json({
    status: 200,
    message: 'Water by date found successfully',
    data: water,
  });
};

export const getMonthWaterController = async (req, res, next) => {
  const userId = req.user._id;
  const { yearMonth } = req.params;
  const water = await getMonthWater(yearMonth, userId);
  if (!water) {
    return next(createHttpError(404, `Water by month ${yearMonth} not found`));
  }
  console.log(water);
  res.status(200).json({
    status: 200,
    message: 'Water by month found successfully',
    data: water,
  });
};
