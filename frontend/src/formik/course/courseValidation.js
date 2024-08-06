import * as Yup from 'yup';
export const courseValidationSchema = Yup.object().shape({
  course_name: Yup.string()
    .required('Course name is required')
    .max(100, 'Course name cannot exceed 100 characters'),
  course_code: Yup.string()
    .required('Course code is required')
    .max(50, 'Course code cannot exceed 50 characters'),
  course_type: Yup.string()
    .required('Course type is required')
    .oneOf(['online', 'offline'], 'Course type must be either "online" or "offline"'),
  course_duration: Yup.string()
    .required('Course duration is required')
    .matches(/^\d+ (hour|day|week|month|year)s?$/, 'Course duration must be in the format of number and time unit (e.g., "2 weeks")'),
  course_price: Yup.number()
    .required('Course price is required')
    .min(0, 'Course price cannot be negative'),
  course_description: Yup.string()
    .required('Course description is required'),
  course_image: Yup.mixed()
    .nullable()
    .notRequired()
    .test('fileSize', 'Image size is too large', value => !value || (value && value.size <= 2000000)) // 2MB
    .test('fileFormat', 'Unsupported format', value => !value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))),
  course_category: Yup.string()
    .required('Course category is required'),
  course_level: Yup.string()
    .required('Course level is required')
    .oneOf(['beginner', 'intermediate', 'advanced'], 'Course level must be either "beginner", "intermediate", or "advanced"'),
  course_language: Yup.string()
    .required('Course language is required'),
  course_author: Yup.string()
    .required('Course author is required'),
  course_status: Yup.string()
    .required('Course status is required')
    .oneOf(['draft', 'published', 'archived'], 'Course status must be either "draft", "published", or "archived"'),
  course_video: Yup.mixed()
    .nullable()
    .notRequired()
    .test('fileSize', 'Video size is too large', value => !value || (value && value.size <= 50000000)) // 50MB
    .test('fileFormat', 'Unsupported format', value => !value || (value && ['video/mp4', 'video/mov'].includes(value.type))),
  course_pdf: Yup.mixed()
    .nullable()
    .notRequired()
    .test('fileSize', 'PDF size is too large', value => !value || (value && value.size <= 10000000)) // 10MB
    .test('fileFormat', 'Unsupported format', value => !value || (value && value.type === 'application/pdf')),
  course_video_url: Yup.string()
    .url('Invalid URL format')
    .nullable()
    .notRequired(),
  course_pdf_url: Yup.string()
    .url('Invalid URL format')
    .nullable()
    .notRequired(),
});
