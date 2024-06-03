export const where = (name: string | undefined, age: number | undefined) => {
    const whereClause: any = {}

    if (name) {
        whereClause.name = {
            contains: String(name),
            mode: "insensitive",
        }
    }

    if (age !== undefined && !isNaN(Number(age))) {
        whereClause.age = Number(age)
    }

    return whereClause
}
