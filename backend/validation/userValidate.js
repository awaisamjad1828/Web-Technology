const {z} = require("zod")


// signup schema
const signupSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6,"password must be at least 6 characters long")
})

// login schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6,"password must be at least 6 characters long")
})

module.exports = {
    signupSchema, loginSchema
}