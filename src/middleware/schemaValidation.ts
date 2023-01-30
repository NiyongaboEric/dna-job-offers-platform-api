import Joi, { AnySchema } from 'joi'

type Ivalidate = Record<string, AnySchema>

const validateUserSignup = Joi.object().keys({
  email: Joi
    .string()
    .email({
      minDomainSegments: 2
    })
    .required(),
  password: Joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  fullName: Joi
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z\s]{0,20}$/)
    .required()
})

const validateUserSignin = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required()
})

const schemaValidation: Ivalidate = {
  '/signup': validateUserSignup,
  '/signin': validateUserSignin
}

export default schemaValidation
