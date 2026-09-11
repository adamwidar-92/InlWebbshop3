import { db } from "../src/db.js"


async function main() {
  // Rensa gamla data (valfritt men bra)
  await db.orderItem.deleteMany()
  await db.order.deleteMany()
  await db.product.deleteMany()

  // Lägg in produkterna
  await db.product.createMany({
    data: [
      {
        name: "Göteborgs Rapé Vit Portion",
        description: "Göteborgs Rapé Vit Portion är ett vitt portionssnus med smak av tobak, lavendel, citrus, enbär & trä. Normalformat, normal styrka. 22 portioner per dosa. Nikotinhalt: 7,2 mg/portion.",
        price: 44.99,
        image: "/src/assets/bilder/GbgRape.jpg",
        category: "White Portion",
      },
      {
        name: "Lundgrens Skåne",
        description: "Lundgrens Skåne är ett vitt portionssnus med smak av tobak, vilda bär och enbär. Normalformat, normal styrka. 22 portioner per dosa. Nikotinhalt: 8,8 mg/portion.",
        price: 42.00,
        image: "/src/assets/bilder/LundgrensSkane.jpg",
        category: "White Portion",
      },
      {
        name: "G.3 No.02 Slim White Extra Strong",
        description: "G.3 No.02 Slim White Extra Strong är ett vitt portionssnus med smak av bergamott, tobak, te & gröna örter. Slim-format, extra stark styrka. 24 portioner per dosa. Nikotinhalt: 16,2 mg/portion.",
        price: 49.90,
        image: "/src/assets/bilder/G3Vit.jpg",
        category: "White Portion",
      },
      {
        name: "VELO Guava Passionfruit 8mg",
        description: "VELO Guava Passionfruit är ett tobaksfritt vitt snus med smak av guava och passionsfrukt. Slim-format, stark styrka. 20 portioner per dosa. Nikotinhalt: 8 mg/portion.",
        price: 39.90,
        image: "/src/assets/bilder/VELOGUAVA.jpg",
        category: "All White",
      },
      {
        name: "LEWA Power Liquorice & Raspberries",
        description: "LEWA Power Liquorice & Raspberries är ett nikotinfritt snus med smak av lakrits och hallon. Innehåller 50 mg koffein per prilla. Slim-format, 18 portioner per dosa.",
        price: 39.99,
        image: "/src/assets/bilder/LewaPower.jpg",
        category: "Nikotinfritt",
      },
      {
        name: "Après Raspberry Liqorice Extra Strong",
        description: "Après Raspberry Liqorice är ett vitt snus i slim-format med smak av hallon och lakrits. Extra stark styrka. 20 portioner per dosa. Nikotinhalt: 8,3 mg/portion.",
        price: 34.90,
        image: "/src/assets/bilder/Apresraspberry.jpg",
        category: "All White",
      },
    ],
  })

  console.log('Seed data skapad!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })