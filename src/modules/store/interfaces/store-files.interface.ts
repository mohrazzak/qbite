export interface CreateStoreFiles {
  backgroundFile?: Express.Multer.File[];
  logoFile: Express.Multer.File[];
}
export interface UpdateStoreFiles {
  backgroundFile?: Express.Multer.File[];
  logoFile?: Express.Multer.File[];
}
