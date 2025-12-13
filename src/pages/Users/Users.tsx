import {useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import imagePlane from '@/assets/pngwing.com.png';

gsap.registerPlugin(ScrollTrigger);

export default function Users() {
  const sectionRef = useRef(null);
  const planeRef = useRef(null);

  useGSAP(() => {
    const plane = planeRef.current;
    const section = sectionRef.current;
    if (!plane || !section) return;

    const flyTween = gsap.fromTo(
      plane,
      {x: '-30vw'},
      {
        x: '120vw',
        duration: 8,
        ease: 'linear',
        paused: true,
      }
    );

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        flyTween.restart();
      },
      onLeaveBack: () => {
        flyTween.pause(0);
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center bg-muted">
      <img
        ref={planeRef}
        src={imagePlane}
        alt="airplane"
        className="w-72 absolute"
      />
    </section>
  );
}

// import {useRef} from 'react';
// import gsap from 'gsap';
// import {useGSAP} from '@gsap/react';
// import imagePlane from '@/assets/pngwing.com.png';

// export default function Users() {
//   const planeRef = useRef<HTMLImageElement>(null);

//   useGSAP(() => {
//     const plane = planeRef.current;
//     if (!plane) return;

//     gsap.fromTo(
//       plane,
//       {
//         x: '-20vw',
//       },
//       {
//         x: '120vw',
//         duration: 10,
//         ease: 'linear',
//       }
//     );
//   });

//   return (
//     <div className="relative h-screen overflow-hidden flex items-center">
//       <img
//         ref={planeRef}
//         src={imagePlane}
//         alt="airplane"
//         className="w-72 absolute"
//       />
//     </div>
//   );
// }
