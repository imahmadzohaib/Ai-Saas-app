

export const incrementApiLimit = async ( userId: string)=>{
    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if(userApiLimit){
        await prisma.userApiLimit.update({
            where: {
                userId
            },

            data:{
                count: userApiLimit.count + 1
            }
        })
    }else{
        await prisma.userApiLimit.create({
            data :{
                userId,
                count:1
            }
        })
    }
}