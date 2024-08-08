import * as Yup from "yup";

export const blogValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("Tags are required"),
  status: Yup.string().oneOf(["draft", "published"], "Invalid status").required("Status is required"),
  blog_image: Yup.mixed().required("Image is required"),
  video: Yup.mixed().notRequired(),
});
