"use client";
import { Controller, useForm } from "react-hook-form";
import FieldContainer from "./field-container";
import { Input } from "../ui/input";
import { Option } from "../ui/multiple-selector";
import { Button } from "../ui/button";

type Inputs = {
  banner: FileList;
};

const bannerImages = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
  },
];

const OPTIONS: Option[] = [
  { label: "S", value: "nextjs" },
  { label: "M", value: "react" },
  { label: "L", value: "remix" },
  { label: "XL", value: "vite" },
];

export default function BannerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset: resetForm,
    setValue,
  } = useForm<Inputs>();

  return (
    <div id="banner">
      <h3 className="text-lg font-bold">Banner</h3>
      <div className="grid grid-cols-2 gap-4">
        <FieldContainer error={errors.banner?.message}>
          <Controller
            name="banner"
            control={control}
            defaultValue={undefined}
            /* rules={{
            validate: (files) =>
              validateFiles(files) ||
              "Solo puedes subir un máximo de 2 archivos en total.",
          }} */
            render={({ field }) => (
              <Input
                id="picture"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                multiple
                onChange={(e) => field.onChange(e.target.files)}
                ref={field.ref}
                className="w-full col-span-3"
                /* disabled={previews.length >= 2} */
              />
            )}
          />
        </FieldContainer>
        {/* {previews.length > 0 && (
          <div className="grid col-span-2 items-center gap-4">
            <ImagePreview
              previews={previews}
              deleteImage={deleteImage}
              loading={loading}
            />
          </div>
        )} */}
      </div>
      <div className="mt-4">
        <Button>Guardar</Button>
      </div>
    </div>
  );
}
