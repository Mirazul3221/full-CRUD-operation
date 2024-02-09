import { IsEmpty, IsNotEmpty } from "class-validator"
import mongoose from "mongoose"
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data"

export class CreatePostDto {
    @IsEmpty({message: "You cannot pass user Id"})
    readonly user_id:mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly description: string
    @IsFile()
    @MaxFileSize(1e6, { message: "File size must be less than 1 MB" })
        @HasMimeType(['image/jpeg','image/png','image/jpg'])
    image:FileSystemStoredFile
}
