import { Router } from 'express'
import SunlightController from '@/controllers/sunlight.controller'
import { Routes } from '@interfaces/routes.interface'

class SunlightRoute implements Routes {
  public path = '/'
  public router = Router()
  public sunlightController = new SunlightController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}sunlight-data`, this.sunlightController.sunlightData)
    this.router.get(`${this.path}sunlight-psnr`, this.sunlightController.sunlightPSNR)
  }
}

export default SunlightRoute
