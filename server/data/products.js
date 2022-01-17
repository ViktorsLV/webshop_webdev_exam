const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    image: "/camera.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    image: "/playstation.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    image: "/mouse.jpg",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    image: "/alexa.jpg",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "ThinkPad X1 Carbon Gen 9 ",
    image: "/thinkpad.jpg",
    description:
      "The Lenovo ThinkPad X1 Carbon Gen 9 features a refined 16:10 display with narrow bezels and a rich, high-resolution screen. Choose the UHD+ panel with Dolby Vision™ to improve your viewing experience. The new one-bar hinge, dual fan, and rear venting for an improved Intelligent Thermal Solution mean you can put in long hours on the job, and the ThinkPad X1 Carbon Gen 9 laptop will stay as cool as you are.",
    brand: "Lenovo",
    category: "Electronics",
    price: 1308.16,
    countInStock: 200,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "iPad Air",
    image: "/ipad.jpg",
    description:
      "iPad Air does more than a computer in simpler, more magical ways. And now with more features and capabilities, it’s more versatile than ever. Like every Apple product, iPad Air was designed with your privacy and security in mind. It’s not always easy. But that’s the kind of innovation we believe in.",
    brand: "Apple",
    category: "Electronics",
    price: 405.0,
    countInStock: 130,
    rating: 4,
    numReviews: 100,
  },
  {
    name: "Smart Clock Gen 2, Grey",
    image: "/smartclock.jpg",
    description:
      "Let your Lenovo Smart Clock 2 organize your day with reminders and alarms. Ask questions, check on traffic and weather, listen to news briefings, and more—all from the comfort of your bedroom. Just ask Google. Control up to 50,000 compatible devices with your voice or touch. And because you can toggle the mute button and the clock doesn’t have a camera, your privacy is assured.",
    brand: "Lenovo",
    category: "Electronics",
    price: 49.99,
    countInStock: 1300,
    rating: 2,
    numReviews: 10,
  },
  {
    name: "QN800A Samsung Neo QLED 8K Smart TV",
    image: "/tv.jpg",
    description:
      "Witness unimaginable details in the deepest blacks to the brightest whites with 1.5X more lighting zones than normal Quantum Matrix Technology. The powerful evolution of Samsung Neo QLED 8K comes with a backlight dimming technology that controls our proprietary Quantum Mini LEDs with intense precision.",
    brand: "Samsung",
    category: "Electronics",
    price: 3299.99,
    countInStock: 199,
    rating: 5,
    numReviews: 20,
  },
  {
    name: "Galaxy Tab S7+, 128GB, Mystic Navy",
    image: "/tablet.jpg",
    description:
      "At 120Hz, this tablet's responsive display instantly reacts to what's on your screen. It intelligently adjusts the refresh rate based on your content and helps you save battery power as you watch or scroll. The Qualcomm Snapdragon 865 Plus Mobile Platform is a breakthrough in processing power. Extremely fast and powerful, this intelligent chipset can run intense games or easily multitask—all with minimal lag. Harness its power as you need.",
    brand: "Samsung",
    category: "Electronics",
    price: 349.99,
    countInStock: 500,
    rating: 4,
    numReviews: 17,
  },
  {
    name: "Apple MacBook Pro 13.3-Inch Laptop 2.6GHz",
    image: "/macbook.jpg",
    description:
      "13.3-inch (diagonal) LED-backlit display with IPS technology; 2560-by-1600 native resolution at 227 pixels per inch with support for millions of colors. Force Touch trackpad for precise cursor control and pressure‑sensing capabilities; enables Force clicks, accelerators, pressure sensitive drawing, and Multi‑Touch gestures.",
    brand: "Apple",
    category: "Electronics",
    price: 1299.99,
    countInStock: 200,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Aluminium Wired Keyboard",
    image: "/macbook.jpg",
    description:
      "At 120Hz, this tablet's responsive display instantly reacts to what's on your screen. It intelligently adjusts the refresh rate based on your content and helps you save battery power as you watch or scroll. The Qualcomm Snapdragon 865 Plus Mobile Platform is a breakthrough in processing power. Extremely fast and powerful, this intelligent chipset can run intense games or easily multitask—all with minimal lag. Harness its power as you need.",
    brand: "Yivandi",
    category: "Electronics",
    price: 39.99,
    countInStock: 900,
    rating: 3,
    numReviews: 28,
  },
  {
    name: "Oculus Quest 2 - 128GB",
    image: "/headset.jpg",
    description:
      "Next-level Hardware - Make every move count with a blazing-fast processor and our highest-resolution display. All-In-One Gaming - With backward compatibility, you can explore new titles and old favorites in the expansive Quest content library. Immersive Entertainment - Get the best seat in the house to live concerts, groundbreaking films, exclusive events and more. Easy Setup - Just open the box, set up with the smartphone app and jump into VR. No PC or console needed. Requires wireless internet access and the Oculus app (free download) to set up device. ",
    brand: "Oculus",
    category: "Electronics",
    price: 299.99,
    countInStock: 120,
    rating: 4,
    numReviews: 68,
  },
];

module.exports = products;
