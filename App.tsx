
import React, { useState, useCallback } from 'react';
import RaccoonScene from './components/RaccoonScene';
import LetterScroll from './components/LetterScroll';
import FinalScene from './components/FinalScene';
import { audioService } from './services/AudioService';

const LETTER_TEXT = `Feliz cumpleaños, Mia.
Feliz cumpleaños a la persona que la vida me presentó sin advertirme que iba a convertirse en una parte imprescindible de mí. Feliz cumpleaños a mi hermana de otra madre, a esa alma que no compartió mi infancia, pero sí mis procesos más reales… Hoy no cumplio años solo tu cuerpo: cumplió años la niña que me ayudo, la chica que a pesar de todo sigue conmigo… Un año más de nuestra amistad, nuestras conversaciones, nuestras risas y nuestros silencios que hablan más que mil palabras.

Hoy quiero detener el tiempo un momento para decirte algo que quizás no se dice lo suficiente, pero que se siente todos los días: gracias por existir en mi vida. Gracias por quedarte cuando otros se fueron. Gracias por elegirme incluso cuando no era fácil estar conmigo. Gracias por conocerme de verdad, no la versión bonita, no la versión fuerte, sino la versión completa: la que duda, la que se rompe, la que se levanta, la que sueña, la que a veces no sabe qué hacer con tanto sentir…

Eres mi lugar seguro en forma de persona.
Eres ese «tranquilo, estoy contigo» que no necesita palabras.
Eres la confianza absoluta, la certeza de que puedo contarte todo sin miedo a ser juzgado, minimizado o malinterpretado. Contigo no tengo que traducirme: me entiendes incluso cuando no sé explicarme…

Dicen que la familia no siempre es de sangre, y contigo esa frase deja de ser una idea idílica para convertirse en una verdad vivida. Poque tú eles mi hermanita de otra madre, pero también eres mucho más: eres la persona que me vio crecer, cambiar, caer, reconstruirme y otra vez caer... La que sabe de dónde vengo y hacia dónde quiero ir... La que conoce mis contradicciones y aun así me hace sentir completo.

Hay amistades que son pasajeras, que acompañan etapas.
Y luego están las amistades como tú: las que se convierten en raíz.
Las que no dependen de la frecuencia, sino de la profundidad.
Las que no se rompen con el tiempo, porque el tiempo las fortalece.

Tú eres el amor de mi vida en amistad.
Un amor que no necesita posesión, ni promesas exageradas, ni demostraciones ruidosas. Un amor tranquilo, leal, honesto. Un amor que suma, que cuida, que escucha. Un amor que no compite, que no exige, que no hiere. Un amor que entiende que cada uno tiene su camino, pero que aun así decide caminar cerca.

Gracias por cada conversación en el velo de la madrugada.
Gracias por cada risa que me devolvió la esperanza.
Gracias por cada consejo que me diste sin imponer.
Gracias por cada vez que me defendiste de mi mismo incluso cuando yo dudaba de mí…
Gracias por cada «aquí estoy» que sostuvo más de lo que imaginas.

Gracias por saber cuándo necesito palabras… y cuándo solo presencia.
Gracias por conocer mis sueños incluso cuando yo los escondía.
Gracias por creer en mí en los momentos en los que yo no podía…

Si algún día dudas de tu valor, quiero que recuerdes esto: has sido hogar para alguien. Has sido refugio, has sido fuerza, has sido amor real. Has cambiado mi vida simplemente siendo tú, y eso no es pequeño, eso es inmenso.

Hoy deseo que la vida te trate con la misma fuerza con la que tú tratas a los demás. Que te devuelva multiplicado todo lo bueno que das sin esperar nada a cambio. Deseo que este nuevo año te encuentre más libre, más en paz, más conectada contigo misma. Que aprendas a elegirte sin culpa. Que entiendas que no tienes que salvar a todos, que también mereces descanso, cuidado y amor.

Deseo que te rodeen personas que te vean como yo te veo: valiosa, única, luminosa. Que nunca tengas que mendigar atención ni cariño. Que nunca te quedes donde no te celebran. Que nunca apagues tu esencia para encajar en espacios que no son para ti…

Y si alguna vez el mundo se vuelve pesado, si la vida se pone difícil, si dudas de todo… aquí estoy. No como obligación, sino como elección. Porque te elijo hoy, y te elegiría en cualquier versión de ti. En la fuerte, en la cansada, en la feliz, en la depre, en la que está aprendiendo.

Gracias por confiarme tus miedos, tus secretos, tus historias. Gracias por dejarme entrar en tu mundo. Gracias por ser esa persona con la que puedo ser auténtico, vulnerable, humano. Gracias por no irte cuando viste mis grietas. Gracias por no intentar cambiarme, sino acompañarme.

Nuestra amistad es de esas que no necesitan demostrarse al mundo, porque se siente en lo profundo. Es de esas que sobreviven a silencios, a distancias, a cambios. Porque está hecha de verdad, y la verdad no se desgasta.

Hoy celebro tu vida, pero también celebro que el destino haya sido tan generoso conmigo al cruzarnos. Celebro cada recuerdo compartido y todos los que aún nos faltan. Celebro que, pase lo que pase, siempre tendremos un «¿te acuerdas cuando…?» que nos una.

Feliz cumpleaños, mi muy querida mejor amiga.
Feliz cumpleaños a la risa que calma, a la voz que acompaña, al corazón que entiende. Gracias por ser mi mejor amiga, mi hermana, mi confidente, mi hogar emocional. Gracias por ser parte de mi historia y permitirme ser parte de la tuya.

Te quiero con un cariño que no caduca, que no se rompe, que no se va.
Te quiero en esta vida y en todas las versiones de nosotros que existan.
Y recuerda siempre: mientras yo esté aquí, no estás sola.

Hoy el mundo es un poco más bonito porque tú cumples años.
Y mi vida, infinitamente mejor porque tú existes. 🤍✨`;

const FINAL_NOTE = `Gracias por todo, gracias por haber estado aquel 20 de febrero, por seguir conmigo a pesar de mis errores por ser la primera persona que se volvio mi mejor amiga por ser mi hermana de otra sangre por estar conmigo... gracias. eres la persona que mas quiero en este mundo y perdon por no ser el amigo que quizas mereces o ser el novio que fiorella merece pero lo intento... intento mejorar y espero hacerlo algun dia... poder superar, poder amar sin recordar...`;

const App: React.FC = () => {
  const [scene, setScene] = useState<'intro' | 'scrolling' | 'final'>('intro');
  const [audioStarted, setAudioStarted] = useState(false);

  const startIntroAudio = useCallback(() => {
    if (!audioStarted) {
      audioService.startTriste();
      setAudioStarted(true);
    }
  }, [audioStarted]);

  const handleRaccoonComplete = () => {
    setScene('scrolling');
    audioService.startLetterMusic();
  };

  const handleScrollComplete = () => {
    setScene('final');
  };

  const paragraphs = LETTER_TEXT.split('\n\n').filter(p => p.trim() !== '');

  return (
    <main className="relative w-full min-h-screen">
      {scene === 'intro' && (
        <RaccoonScene 
          onInteraction={startIntroAudio} 
          onComplete={handleRaccoonComplete} 
        />
      )}
      
      {scene === 'scrolling' && (
        <div className="animate-in slide-in-from-bottom duration-1000">
           <LetterScroll 
             paragraphs={paragraphs} 
             onFinish={handleScrollComplete} 
           />
        </div>
      )}

      {scene === 'final' && (
        <FinalScene note={FINAL_NOTE} />
      )}
    </main>
  );
};

export default App;
