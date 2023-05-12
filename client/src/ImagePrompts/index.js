const images = [
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629653/image_xebvgi.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629654/image2_rcmqcn.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629654/image3_yyniuy.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629654/img10_c1ikv5.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629654/image4_meknzn.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629655/img12_rgmzna.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629655/img13_hxzox2.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629655/image5_mgemif.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629655/image6_schwpe.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629655/img7_ltxnty.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629655/img11_llaves.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683816660/prompthero-prompt-c924d0ec057_moviud.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629656/img9_qjtjvd.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683629656/img8_uwjdke.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683630018/img14_a24xms.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683660335/img15_ymfgyw.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683816393/prompthero-prompt-0499758911d_rdj7jn.webp",
  "https://res.cloudinary.com/dlpgowt5s/image/upload/v1683816485/prompthero-prompt-04dfdbf6b7b_xdor1p.webp",
]

const prompts = [
  "A greeting cat, Vector Illustation, line stamp, kawaii",
  "hedgehog smelling a flower | clear blue sky | intricate artwork by Beatrix Potter | cottagecore aesthetic | 8K | highly detailed | wide angle |",
  "a cowboy gunslinger walking the neon lit streets and alleys of a futuristic tokyo covered in a dense fog",
  "A digital Illustration of the a purely mechanical television, 4k, detailed, fantasy vivid colors",
  "a big large happy kawaii fluffy cutest baby Shiba-inu puppy wearing kimono enjoy shopping in a futuristic abandoned city, anime movie, IMAX, cinematic lighting, only in cinema, Makoto Shinkai",
  "Synthwave halloween formula 1 car racing on a night road in Singapore",
  "a photo of cat flying out to space as an astronaut, digital art",
  "a baby wolf with sunglasses eating a cheeseburger by the pool, digital art",
  "astronaut lost in space in vector style",
  "a realistic photographic close up of a floating transparent cup of coffee with liquid splashing in zero gravity with light rays refracting through the coffee",
  "painting of a young woman absorbed in thought, in pink mini dress, looking at her cellphone while wating at a bus stop, on an empty road, in Willem Maris impressionist style",
  "wonderful Korean girl in sunshine, Moldova, river Dniestr, light foreground, smile, the breeze in their hair, strapless, with golden ratio style, 4K , light on face, background: hills and forest, foreground is lavender field, light is Golden hour, sky with Clouds, ultrarealistic, CinémaScope, ultra wide format, ratio 16/9, 1/1000 sec",
  "face of a man with spectacles and freckles in the style of Théo Rysselberghe",
  "Haunting November day in Weimar Berlin people on the street dark cabaret Grosz",
  "Photo of Artificial intelligence drawing a picture of the universe in a house on Mars with an easel",
  "High definition. Portrait. A gorgeous black girl from the 1990s slaying a dragon using a musical note as a weapon. Cloud dragon backdrop. Doorknocker earrings. Bomber jacket. Asymmetric mushroom haircut.",
  "“Retro” “vintage” “retro vintage” “neon retro” “antique” “classic” “west coast” “diner” “car” “club” “drive-in”",
  "ultra-wide photo red sci-fi armor with cyber helmet, lights on cyber mask, full armor, insulated armor, angry, active pose, strong warrior, weapon, optimus prime style, bald head, lots of fine detail, Blur Effect, Long Exposure, 8K, Ultra-HD, Moody Lighting, Cinematic Lighting",
]

const ImagePrompts = []

for (let i = 0; i < images.length; i++) {
  ImagePrompts.push({
    id: i + 1,
    image: images[i],
    prompt: prompts[i],
    alt: `Prompt ${i + 1}`,
  })
}

export default ImagePrompts
