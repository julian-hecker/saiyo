// === Packages ===
const express = require('express');
const app = express();

// === App Configuration ===
app.use(express.json());
Hi Julian




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
});
