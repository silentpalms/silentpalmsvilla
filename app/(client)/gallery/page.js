import Image from "next/image";
import { Cormorant } from "next/font/google";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const images = [
    "https://res.cloudinary.com/isadia94/image/upload/v1691053980/silentpalms/g3th6pxwh9pewlkbxmjx.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054005/silentpalms/lebjqpaniducyfgbqw9d.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054018/silentpalms/e1ps8zuenomyqsn6mdzy.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054046/silentpalms/fuxgjdxl4wowy7sd5kkv.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054071/silentpalms/dmw7ynffonoedyhv7ka7.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054076/silentpalms/nfmvm9kwdhuqamh9u0or.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054088/silentpalms/un7azfnfrrdiywofq0nq.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054094/silentpalms/o8ooylxe90vxicwagnlu.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054099/silentpalms/f3iw4qydan9gebxjib2y.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691054101/silentpalms/lgghftsjcgpiipclwzvm.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055337/silentpalms/yyvgt1wxh9dd6sydcswr.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055341/silentpalms/zphpbjtr2zjjlzr2pqxj.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055345/silentpalms/cygfhk2ahad6fl6foita.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055351/silentpalms/nsemhbrmsf4kx0ezxyip.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055816/silentpalms/pkvijb7xxtehuder9k6m.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055817/silentpalms/wwfzujeukg8wfmnafglv.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055818/silentpalms/l1dycietfahxjqdah9ll.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055823/silentpalms/oheba5zu8tez87rmvneh.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055827/silentpalms/mievn58ukktyhygmwoit.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055829/silentpalms/bijq6q2hwejmrtev0e9g.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691055831/silentpalms/q1pclkmbuv2e0p6yeisy.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691061380/silentpalms/jtortppkipoqcu6yg2zu.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691061385/silentpalms/u49n20qwb8d7surcl4wq.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691061389/silentpalms/buycvdv4xy53gqjowcyo.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691061391/silentpalms/fq8cb8l4vyp795ihvfez.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059642/silentpalms/lgraakjlycaeameutifm.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059655/silentpalms/ubbsxmotuxnxeaao10dx.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059668/silentpalms/enepggvznzdnmtrm69vm.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059677/silentpalms/qhf6aypbl48bwh8rptoc.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059577/silentpalms/pe5b3jnmijrmqqrzvsca.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059589/silentpalms/fdxh0on6bn55whsfw6ln.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691059598/silentpalms/dtzlhlpdzysctccj7beo.webp",
    "https://res.cloudinary.com/isadia94/image/upload/v1691056117/silentpalms/jd4hqzglcoccbpa4hxgh.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691056126/silentpalms/l0n4mkophp0mai2oq2db.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691056140/silentpalms/wfaxeypdhydpanwa0j91.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691056152/silentpalms/q17nysosl5uggedp1gbk.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/v1691056155/silentpalms/p8hi8vtxakojk6ba1pnh.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1691792891/silentpalms/WhatsApp_Image_2023-08-11_at_20.17.20_sqdwuv.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1691792776/silentpalms/Event_hosting_tlf0ez.jpg",
    "https://res.cloudinary.com/isadia94/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1691792889/silentpalms/WhatsApp_Image_2023-08-11_at_20.16.54_zump2s.jpg",
  ];

const page = () => {
  return (
    <div className="px-4 mb-24 h-full">
        <div
          className={`${cormorant.className} text-[50px] text-center my-12 font-bold text-green-800`}
        >
          <h1>GALLERY</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {images.map((image, index) => {
            return (
              <div className="relative h-[300px]" key={index}>
                <Image
                  src={image}
                  alt="image"
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default page