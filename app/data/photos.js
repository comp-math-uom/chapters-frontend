function assetLink(asset, width) {
    return `https://assets.react-photo-album.com/_next/image?url=${encodeURIComponent(`/_next/static/media/${asset}`)}&w=${width}&q=75`;
}

const photos = [
    { asset: "image01.018d1d35.jpg", width: 1080, height: 780, topic: "NATURE" },
    { asset: "image02.cf33eff7.jpg", width: 1080, height: 1620, topic: "PORTRAIT" },
    { asset: "image03.cdc32b45.jpg", width: 1080, height: 720, topic: "CITYSCAPE" },
    { asset: "image04.9a1f6335.jpg", width: 1080, height: 720, topic: "TRAVEL" },
    { asset: "image05.d7ef12b4.jpg", width: 1080, height: 1620, topic: "FASHION" },
    { asset: "image06.4ab952e3.jpg", width: 1080, height: 607, topic: "LANDSCAPE" },
    { asset: "image07.ac608196.jpg", width: 1080, height: 608, topic: "ARCHITECTURE" },
    { asset: "image08.95e095b5.jpg", width: 1080, height: 720, topic: "WILDLIFE" },
    { asset: "image09.fa6c4764.jpg", width: 1080, height: 1549, topic: "ABSTRACT" },
    { asset: "image10.411ea655.jpg", width: 1080, height: 720, topic: "FOOD" },
    { asset: "image11.f3ea483a.jpg", width: 1080, height: 694, topic: "SPORTS" },
    { asset: "image12.5a9347ea.jpg", width: 1080, height: 1620, topic: "MACRO" },
    { asset: "image13.ce46dd98.jpg", width: 1080, height: 720, topic: "NIGHT" },
    { asset: "image14.68b2812c.jpg", width: 1080, height: 1440, topic: "STREET" },
    { asset: "image15.4461facf.jpg", width: 1080, height: 1620, topic: "UNDERWATER" },
    { asset: "image16.5ad17d8b.jpg", width: 1080, height: 810, topic: "AERIAL" },
    { asset: "image17.a242e897.jpg", width: 1080, height: 595, topic: "INDUSTRIAL" },
    { asset: "image18.0479bde8.jpg", width: 1080, height: 160, topic: "PANORAMA" },
    { asset: "image19.ab7b61f4.jpg", width: 1080, height: 810, topic: "WEDDING" },
    { asset: "image20.f62571df.jpg", width: 1080, height: 720, topic: "DOCUMENTARY" },
    { asset: "image21.14c9bee0.jpg", width: 1080, height: 1440, topic: "VINTAGE" },
].map(({ asset, width, height, topic }) => ({ src: assetLink(asset, width), width, height, topic }));

export default photos;