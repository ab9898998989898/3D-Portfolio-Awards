import { useRef } from "react"
import AnimatedHeaderSection from "../components/AnimatedHeaderSection"
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
    const imgRef = useRef(null);
    useGSAP(()=>{
        gsap.to('#about', {
            scale:0.95,
            scrollTrigger:{
                trigger:'#about',
                start:'bottom 80%',
                end:'bottom 20%',
                scrub:true,
            },
            ease:"power1.inOut"
        });

        gsap.set(imgRef.current, {
            clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);"
        });
        gsap.to(imgRef.current,{
            clipPath:"polygon(0 100%, 100% 100%, 100% 0, 0 0);",
            duration:2,
            ease:"power4.out",
            scrollTrigger:{
                trigger:imgRef.current,
            }
        })
    })

    const text = `Passionate about clean architecture
    I build scalable, high-perfomance solutions
    from prototype to production.`
    const aboutText = `I'm Abdullah Nadeem, a Full-Stack Developer passionate about crafting secure, 💻
    enterprise-grade web applications. With deep expertise in front-end and back-end systems, 🚀
    I deliver intuitive user experiences that drive growth and efficiency. 📈
    I build scalable, future-proof solutions designed for long-term success. 🛡️
    Let's collaborate to bring your vision to life with precision and code that impacts. 🤝`;


  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
        <AnimatedHeaderSection subtitle={"Code with purpose, Built to scale"} title1={"About"} title2={"Me"} text={text} textColor={"text-white"} withScrollTrigger={true} />
        <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl  font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
            <img ref={imgRef} src="images/ab.png" alt="abdullah-nadeem" title="abdullah-nadeem" className="w-md rounded-3xl" />
            <AnimatedTextLines text={aboutText} className={"w-full"} />
        </div>
    </section>
  )
}

export default About