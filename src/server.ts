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

    try {
        await prisma.user.create({
            data: {
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
            },
        })

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({})

        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.put("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id
    const newUser: User = req.body

    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
            },
        })

        res.status(200).send("ok")
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.listen(3000)
