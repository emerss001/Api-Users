import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

interface User {
    name: string
    email: string
    age: number
}

app.post("/users", async (req: Request, res: Response) => {
    const newUser: User = req.body

    await prisma.user.create({
        data: {
            name: newUser.name,
            email: newUser.email,
            age: newUser.age,
        },
    })

    res.status(201).json(newUser)
})

app.listen(3000)
