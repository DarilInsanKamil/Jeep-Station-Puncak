import { nanoid } from "nanoid";
import { BundlesModel } from "./model";

export abstract class Bundles {
    static async addBundles(payload: BundlesModel.BundlesPayload) {
        const { addOns, main } = payload
        const bundlesId = `bnd-${nanoid(16)}`

        

    }
    static async getAllBundles() {

    }
    static async getBundleById() {

    }
    static async editBundleById() {

    }
    static async deleteBundleById() {

    }
}