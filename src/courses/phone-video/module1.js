import { phone } from '../../i18n/content.js'

/**
 * Your first video — the whole of the phone-video course, in six lessons.
 *
 * Written for one learner first: a grandmother in her late seventies who wants
 * to start making videos and has not yet learned her phone. So, more strictly
 * than anywhere else in the app:
 *   - one action per screen; never two instructions in one step
 *   - every word that names a thing (screen, tap, app, swipe…) is explained
 *     the first time it appears
 *   - a wrong tap is never "wrong": it is "that's okay, try the one with…"
 *   - each lesson ends with one small, friendly check, then the usual finish
 *
 * Screens come from the phone simulation (sims/PhoneSim.jsx), drawn as an
 * iPhone or an Android to match settings.phone; `phone(a, b)` picks the words
 * the same way `dev()` picks Windows or Mac.
 */

const meetYourPhone = {
  id: 'pv-m1-l1',
  icon: 'phone',
  minutes: 3,
  title: { en: 'Meet your phone', es: 'Conoce tu celular' },
  steps: [
    {
      type: 'teach',
      title: { en: 'This is the screen', es: 'Esta es la pantalla' },
      body: [
        {
          en: 'The big glass part on the front of your phone is the **screen**. It shows you pictures and words.',
          es: 'La parte grande de vidrio, al frente de tu celular, es la **pantalla**. Ahí ves fotos y letras.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'body', labels: ['screen'] } },
    },
    {
      type: 'teach',
      title: { en: 'You touch it', es: 'Se usa tocándola' },
      body: [
        {
          en: 'To use your phone, you touch the screen with one finger. A quick, light touch is called a **tap**.',
          es: 'Para usar tu celular, tocas la pantalla con un dedo. Un toquecito rápido y suave se llama **tocar**, o dar un **toque**.',
        },
        {
          en: 'You can’t break it by tapping. Tap as much as you like.',
          es: 'No se descompone por tocarlo. Toca todo lo que quieras.',
        },
      ],
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the screen.', es: 'Toca la pantalla.' },
      config: {
        screen: 'body',
        target: 'screen',
        nudge: { en: 'That’s okay. Try the big glass part.', es: 'No pasa nada. Prueba en la parte grande de vidrio.' },
      },
    },
    {
      type: 'teach',
      title: { en: 'The little pictures are apps', es: 'Los dibujitos son apps' },
      body: [
        {
          en: 'The small pictures on the screen are **apps**. Each app does one job, like taking pictures or making calls.',
          es: 'Los dibujitos de la pantalla son **apps** (se dice "aps"). Cada app sirve para una cosa, como tomar fotos o hacer llamadas.',
        },
        {
          en: 'The screen where all your apps live is the **home screen**.',
          es: 'La pantalla donde están todas tus apps se llama **pantalla de inicio**.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'home' } },
    },
    {
      type: 'teach',
      title: { en: 'Going back home', es: 'Regresar al inicio' },
      body: [
        phone(
          {
            en: 'From any app, you can always get back to the home screen. On an iPhone, put your finger on the little line at the very bottom and slide it up. That slide is called a **swipe**.',
            es: 'Desde cualquier app siempre puedes regresar a la pantalla de inicio. En el iPhone, pon el dedo en la rayita de hasta abajo y deslízalo hacia arriba. A eso se le dice **deslizar**.',
          },
          {
            en: 'From any app, you can always get back to the home screen. At the bottom there is a round button. That is the **home button**.',
            es: 'Desde cualquier app siempre puedes regresar a la pantalla de inicio. Abajo hay un botón redondito. Ese es el **botón de inicio**.',
          }
        ),
      ],
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: phone(
        { en: 'Swipe up from the little line at the bottom.', es: 'Desliza hacia arriba desde la rayita de abajo.' },
        { en: 'Tap the round home button.', es: 'Toca el botón redondito de inicio.' }
      ),
      config: {
        screen: 'app',
        target: 'home',
        nudge: phone(
          { en: 'That’s okay. Put your finger on the little line and slide it up.', es: 'No pasa nada. Pon el dedo en la rayita y deslízalo hacia arriba.' },
          { en: 'That’s okay. Try the round button at the bottom.', es: 'No pasa nada. Prueba con el botón redondito de abajo.' }
        ),
      },
    },
    {
      type: 'recap',
      points: [
        { en: 'The **screen** is the glass you touch. A light touch is a **tap**.', es: 'La **pantalla** es el vidrio que tocas. Un toquecito es **tocar**.' },
        { en: '**Apps** are the little pictures on the **home screen**.', es: 'Las **apps** son los dibujitos de la **pantalla de inicio**.' },
        phone(
          { en: 'Swiping up from the bottom line takes you home.', es: 'Deslizar desde la rayita de abajo te regresa al inicio.' },
          { en: 'The round button takes you home.', es: 'El botón redondito te regresa al inicio.' }
        ),
      ],
    },
    {
      type: 'choice',
      prompt: { en: 'What is an app?', es: '¿Qué es una app?' },
      options: [
        {
          id: 'a',
          label: { en: 'A little picture that opens something, like the camera', es: 'Un dibujito que abre algo, como la cámara' },
          correct: true,
        },
        {
          id: 'b',
          label: { en: 'A scratch on the screen', es: 'Un rayón en la pantalla' },
          why: { en: 'That’s okay! An app is one of the little pictures on your screen.', es: '¡No pasa nada! Una app es uno de los dibujitos de tu pantalla.' },
        },
      ],
    },
  ],
}

const openTheCamera = {
  id: 'pv-m1-l2',
  icon: 'camera',
  minutes: 2,
  title: { en: 'Open the camera', es: 'Abre la cámara' },
  steps: [
    {
      type: 'teach',
      title: { en: 'Your phone has a camera', es: 'Tu celular tiene cámara' },
      body: [
        {
          en: 'A **camera** is a tiny eye on your phone that sees what’s in front of it.',
          es: 'La **cámara** es como un ojito de tu celular que ve lo que tiene enfrente.',
        },
        {
          en: 'To use it, you open the **Camera app**. Its picture looks like a little camera.',
          es: 'Para usarla, abres la **app de Cámara**. Su dibujito parece una camarita.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'home', highlight: 'camera' } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the Camera app.', es: 'Toca la app de Cámara.' },
      config: {
        screen: 'home',
        target: 'camera',
        nudge: { en: 'That’s okay. Try the one with the camera.', es: 'No pasa nada. Prueba con la que tiene la camarita.' },
      },
    },
    {
      type: 'teach',
      title: { en: 'Now it’s looking', es: 'Ya está viendo' },
      body: [
        {
          en: 'Your screen now shows what the camera sees. Point the phone at something and it appears on the screen.',
          es: 'Ahora tu pantalla enseña lo que ve la cámara. Apunta el celular a algo y aparece en la pantalla.',
        },
        {
          en: 'Nothing is saved yet. It’s only looking.',
          es: 'Todavía no se guarda nada. Nada más está viendo.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'camera', state: { mode: 'photo' } } },
    },
    {
      type: 'recap',
      points: [
        { en: 'The **Camera app** looks like a little camera. One tap opens it.', es: 'La **app de Cámara** parece una camarita. Con un toque se abre.' },
      ],
    },
    {
      type: 'choice',
      prompt: { en: 'How do you open the camera?', es: '¿Cómo abres la cámara?' },
      options: [
        {
          id: 'a',
          label: { en: 'Tap the little camera picture', es: 'Tocar el dibujito de la camarita' },
          correct: true,
        },
        {
          id: 'b',
          label: { en: 'Shake the phone', es: 'Sacudir el celular' },
          why: { en: 'That’s okay! Shaking does nothing. Just tap the little camera.', es: '¡No pasa nada! Sacudirlo no hace nada. Nada más toca la camarita.' },
        },
      ],
    },
  ],
}

const recordYourFirstVideo = {
  id: 'pv-m1-l3',
  icon: 'video',
  minutes: 3,
  title: { en: 'Record your first video', es: 'Graba tu primer video' },
  steps: [
    {
      type: 'teach',
      title: { en: 'Photo or video', es: 'Foto o video' },
      body: [
        {
          en: 'A **photo** is one still picture. A **video** is a picture that moves and has sound, like a little movie.',
          es: 'Una **foto** es una imagen quieta. Un **video** es una imagen que se mueve y tiene sonido, como una peliculita.',
        },
        phone(
          {
            en: 'The camera starts on **PHOTO**. The words under the picture let you switch.',
            es: 'La cámara empieza en **FOTO**. Las palabras de abajo sirven para cambiarle.',
          },
          {
            en: 'The camera starts on **Photo**. The words near the bottom let you switch.',
            es: 'La cámara empieza en **Foto**. Las palabras de abajo sirven para cambiarle.',
          }
        ),
      ],
      visual: { sim: 'phone', config: { screen: 'camera', state: { mode: 'photo' }, highlight: 'video-mode' } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the word Video.', es: 'Toca la palabra Video.' },
      config: {
        screen: 'camera',
        state: { mode: 'photo' },
        target: 'video-mode',
        nudge: { en: 'That’s okay. Try the word that says Video.', es: 'No pasa nada. Prueba con la palabra que dice Video.' },
      },
    },
    {
      type: 'teach',
      title: { en: 'The red button', es: 'El botón rojo' },
      body: [
        {
          en: 'Now the big round button is red. Red means it’s ready to **record**, which means to start saving a video.',
          es: 'Ahora el botón grande y redondo está rojo. Rojo quiere decir que está lista para **grabar**, o sea, para empezar a guardar un video.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'camera', state: { mode: 'video' }, highlight: 'shutter' } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the red button to start recording.', es: 'Toca el botón rojo para empezar a grabar.' },
      config: {
        screen: 'camera',
        state: { mode: 'video' },
        target: 'shutter',
        nudge: { en: 'That’s okay. Try the big round red button.', es: 'No pasa nada. Prueba con el botón grande, rojo y redondo.' },
      },
    },
    {
      type: 'teach',
      title: { en: 'You’re recording!', es: '¡Ya estás grabando!' },
      body: [
        {
          en: 'While it records, the button turns into a red square, and a little clock at the top counts the seconds.',
          es: 'Mientras graba, el botón se vuelve un cuadrito rojo y arriba un relojito va contando los segundos.',
        },
        {
          en: 'Everything the camera sees and hears is being saved.',
          es: 'Todo lo que la cámara ve y oye se está guardando.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'camera', state: { mode: 'video', recording: true } } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the red square to stop.', es: 'Toca el cuadrito rojo para parar.' },
      config: {
        screen: 'camera',
        state: { mode: 'video', recording: true },
        target: 'shutter',
        nudge: { en: 'That’s okay. Try the red square at the bottom.', es: 'No pasa nada. Prueba con el cuadrito rojo de abajo.' },
      },
    },
    {
      type: 'recap',
      points: [
        { en: 'Tap **Video**, then the red button to start.', es: 'Toca **Video** y luego el botón rojo para empezar.' },
        { en: 'Tap it again to stop. Your video is saved.', es: 'Tócalo otra vez para parar. Tu video queda guardado.' },
      ],
    },
    {
      type: 'choice',
      prompt: { en: 'How do you stop recording?', es: '¿Cómo dejas de grabar?' },
      options: [
        {
          id: 'a',
          label: { en: 'Tap the red button again', es: 'Tocar otra vez el botón rojo' },
          correct: true,
        },
        {
          id: 'b',
          label: { en: 'Put the phone in my pocket', es: 'Guardar el celular en la bolsa' },
          why: {
            en: 'That’s okay! It would keep recording the inside of your pocket. Tap the red button to stop.',
            es: '¡No pasa nada! Seguiría grabando lo de adentro de la bolsa. Toca el botón rojo para parar.',
          },
        },
      ],
    },
  ],
}

const watchItBack = {
  id: 'pv-m1-l4',
  icon: 'play',
  minutes: 2,
  title: { en: 'Watch it back', es: 'Mira tu video' },
  steps: [
    {
      type: 'teach',
      title: { en: 'Where your video went', es: 'Dónde quedó tu video' },
      body: [
        phone(
          {
            en: 'Your video was saved in **Photos**, the app that keeps all your pictures and videos.',
            es: 'Tu video se guardó en **Fotos**, la app donde se juntan todas tus fotos y videos.',
          },
          {
            en: 'Your video was saved in the **Gallery**, the app that keeps all your pictures and videos.',
            es: 'Tu video se guardó en la **Galería**, la app donde se juntan todas tus fotos y videos.',
          }
        ),
        {
          en: 'The quickest way there is the small square in the corner of the camera. It shows the last thing you recorded.',
          es: 'Lo más rápido es el cuadrito de la esquina de la cámara. Ahí sale lo último que grabaste.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'camera', state: { mode: 'video', thumb: true }, highlight: 'thumbnail' } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the small square in the corner.', es: 'Toca el cuadrito de la esquina.' },
      config: {
        screen: 'camera',
        state: { mode: 'video', thumb: true },
        target: 'thumbnail',
        nudge: { en: 'That’s okay. Try the small picture in the bottom corner.', es: 'No pasa nada. Prueba con la imagencita de la esquina de abajo.' },
      },
    },
    {
      type: 'teach',
      title: { en: 'The play button', es: 'El botón de play' },
      body: [
        {
          en: 'Here is your video. The triangle in the middle is the **play** button. Play means start the video.',
          es: 'Aquí está tu video. El triangulito del centro es el botón de **play** (se dice "plei"). Quiere decir que empieza el video.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'viewer', highlight: 'play' } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the play button.', es: 'Toca el botón de play.' },
      config: {
        screen: 'viewer',
        target: 'play',
        nudge: { en: 'That’s okay. Try the triangle in the middle.', es: 'No pasa nada. Prueba con el triangulito del centro.' },
      },
    },
    {
      type: 'recap',
      points: [
        { en: 'The small square in the camera opens your last video. The triangle plays it.', es: 'El cuadrito de la cámara abre tu último video. El triangulito lo reproduce.' },
      ],
    },
    {
      type: 'choice',
      prompt: { en: 'Where are your videos kept?', es: '¿Dónde se guardan tus videos?' },
      options: [
        {
          id: 'a',
          label: phone({ en: 'In the Photos app', es: 'En la app de Fotos' }, { en: 'In the Gallery app', es: 'En la app de Galería' }),
          correct: true,
        },
        {
          id: 'b',
          label: { en: 'They disappear', es: 'Se desaparecen' },
          why: phone(
            { en: 'That’s okay! They stay in Photos until you delete them.', es: '¡No pasa nada! Se quedan en Fotos hasta que tú los borres.' },
            { en: 'That’s okay! They stay in the Gallery until you delete them.', es: '¡No pasa nada! Se quedan en la Galería hasta que tú los borres.' }
          ),
        },
      ],
    },
  ],
}

const deleteOne = {
  id: 'pv-m1-l5',
  icon: 'trash',
  minutes: 3,
  title: { en: 'Delete one you don’t like', es: 'Borra el que no te guste' },
  steps: [
    {
      type: 'teach',
      title: { en: 'Not every video is a keeper', es: 'No todos los videos salen bien' },
      body: [
        {
          en: 'Sometimes a video comes out blurry, or you filmed the floor by mistake. You can **delete** it, which means take it off your phone.',
          es: 'A veces un video sale borroso, o grabaste el piso sin querer. Lo puedes **borrar**, o sea, quitarlo de tu celular.',
        },
      ],
    },
    {
      type: 'teach',
      title: { en: 'Why it’s safe', es: 'Por qué no hay peligro' },
      body: [
        phone(
          {
            en: 'A deleted video waits in a folder called **Recently Deleted** for 30 days.',
            es: 'Un video borrado se queda esperando 30 días en una carpeta que se llama **Eliminados**.',
          },
          {
            en: 'A deleted video waits in the **Trash** for 30 days.',
            es: 'Un video borrado se queda esperando 30 días en la **Papelera**.',
          }
        ),
        {
          en: 'If you change your mind, you can bring it back from there. Nothing is gone for good right away.',
          es: 'Si te arrepientes, de ahí lo puedes recuperar. No se pierde para siempre luego luego.',
        },
      ],
      callout: { en: 'Deleting can’t harm your phone.', es: 'Borrar no le hace daño a tu celular.' },
      calloutTone: 'grass',
      calloutIcon: 'heart',
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the trash can.', es: 'Toca el botecito de basura.' },
      config: {
        screen: 'viewer',
        target: 'trash',
        nudge: { en: 'That’s okay. Try the little trash can.', es: 'No pasa nada. Prueba con el botecito de basura.' },
      },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: phone(
        { en: 'The phone checks with you. Tap Delete Video.', es: 'El celular te pregunta para estar seguro. Toca Eliminar video.' },
        { en: 'The phone checks with you. Tap Move to Trash.', es: 'El celular te pregunta para estar seguro. Toca Mover a la Papelera.' }
      ),
      config: {
        screen: 'confirm',
        target: 'confirm-delete',
        nudge: phone(
          { en: 'That’s okay. Try the red words: Delete Video.', es: 'No pasa nada. Prueba con las letras rojas: Eliminar video.' },
          { en: 'That’s okay. Try Move to Trash.', es: 'No pasa nada. Prueba con Mover a la Papelera.' }
        ),
      },
    },
    {
      type: 'recap',
      points: [
        phone(
          { en: 'The trash can deletes a video. It waits in Recently Deleted for 30 days, just in case.', es: 'El botecito de basura borra el video. Se queda 30 días en Eliminados, por si acaso.' },
          { en: 'The trash can deletes a video. It waits in the Trash for 30 days, just in case.', es: 'El botecito de basura borra el video. Se queda 30 días en la Papelera, por si acaso.' }
        ),
      ],
    },
    {
      type: 'choice',
      prompt: { en: 'Is it safe to delete a video you don’t like?', es: '¿Está bien borrar un video que no te gustó?' },
      options: [
        {
          id: 'a',
          label: { en: 'Yes, and I can get it back for 30 days', es: 'Sí, y lo puedo recuperar durante 30 días' },
          correct: true,
        },
        {
          id: 'b',
          label: { en: 'No, it could break the phone', es: 'No, se puede descomponer el celular' },
          why: {
            en: 'That’s okay! Deleting can’t break anything, and you have 30 days to change your mind.',
            es: '¡No pasa nada! Borrar no descompone nada, y tienes 30 días para arrepentirte.',
          },
        },
      ],
    },
  ],
}

const sendItToFamily = {
  id: 'pv-m1-l6',
  icon: 'send',
  minutes: 3,
  title: { en: 'Send it to family', es: 'Mándaselo a la familia' },
  steps: [
    {
      type: 'teach',
      title: { en: 'WhatsApp', es: 'WhatsApp' },
      body: [
        {
          en: '**WhatsApp** is an app for sending messages, photos and videos to people. Its picture is green, with a little phone inside a speech bubble.',
          es: '**WhatsApp** es una app para mandar mensajes, fotos y videos. Su dibujito es verde, con un teléfono adentro de un globito.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'home', highlight: 'whatsapp' } },
    },
    {
      type: 'teach',
      title: { en: 'The share button', es: 'El botón de compartir' },
      body: [
        phone(
          {
            en: 'To send a video, you start from the video itself. The **share** button is the box with an arrow pointing up. Share means send it to someone.',
            es: 'Para mandar un video, empiezas desde el mismo video. El botón de **compartir** es la cajita con una flecha para arriba. Compartir quiere decir mandárselo a alguien.',
          },
          {
            en: 'To send a video, you start from the video itself. The **share** button is three little dots joined by lines. Share means send it to someone.',
            es: 'Para mandar un video, empiezas desde el mismo video. El botón de **compartir** son tres puntitos unidos con rayitas. Compartir quiere decir mandárselo a alguien.',
          }
        ),
      ],
      visual: { sim: 'phone', config: { screen: 'viewer', highlight: 'share' } },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the share button.', es: 'Toca el botón de compartir.' },
      config: {
        screen: 'viewer',
        target: 'share',
        nudge: phone(
          { en: 'That’s okay. Try the box with the arrow pointing up.', es: 'No pasa nada. Prueba con la cajita de la flecha para arriba.' },
          { en: 'That’s okay. Try the three little dots joined by lines.', es: 'No pasa nada. Prueba con los tres puntitos unidos.' }
        ),
      },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Now pick the app to send it with. Tap WhatsApp.', es: 'Ahora escoge con qué app mandarlo. Toca WhatsApp.' },
      config: {
        screen: 'share',
        target: 'whatsapp',
        // Not "the green one": Messages is green too, right beside it.
        nudge: {
          en: 'That’s okay. Try the one with WhatsApp written under it.',
          es: 'No pasa nada. Prueba con la que dice WhatsApp abajo.',
        },
      },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Now pick who gets it. Tap Iván.', es: 'Ahora escoge a quién se lo mandas. Toca a Iván.' },
      config: {
        screen: 'contacts',
        target: 'ivan',
        nudge: { en: 'That’s okay. Try Iván’s name.', es: 'No pasa nada. Prueba con el nombre de Iván.' },
      },
    },
    {
      type: 'sim',
      sim: 'phone',
      prompt: { en: 'Tap the green circle with the arrow to send it.', es: 'Toca el círculo verde con la flechita para mandarlo.' },
      config: {
        screen: 'chat',
        state: { to: 'ivan' },
        target: 'send',
        nudge: { en: 'That’s okay. Try the green circle at the bottom.', es: 'No pasa nada. Prueba con el círculo verde de abajo.' },
      },
    },
    {
      type: 'teach',
      title: { en: 'Sent!', es: '¡Ya se mandó!' },
      body: [
        {
          en: 'Two little check marks mean it arrived. Iván can watch it now.',
          es: 'Las dos palomitas quieren decir que ya llegó. Iván ya lo puede ver.',
        },
      ],
      visual: { sim: 'phone', config: { screen: 'chat', state: { to: 'ivan', sent: true } } },
    },
    {
      type: 'recap',
      points: [
        { en: 'Share, then WhatsApp, then the person, then the green arrow.', es: 'Compartir, luego WhatsApp, luego la persona, y luego la flechita verde.' },
      ],
    },
    {
      type: 'choice',
      prompt: { en: 'Which app did you send the video with?', es: '¿Con qué app mandaste el video?' },
      options: [
        { id: 'a', label: { en: 'WhatsApp', es: 'WhatsApp' }, correct: true },
        {
          id: 'b',
          label: { en: 'The Camera', es: 'La Cámara' },
          why: { en: 'That’s okay! The camera makes the video. WhatsApp sends it.', es: '¡No pasa nada! La cámara hace el video. WhatsApp lo manda.' },
        },
      ],
    },
  ],
}

export default {
  id: 'pv-m1',
  icon: 'video',
  title: { en: 'Your first video', es: 'Tu primer video' },
  subtitle: {
    en: 'From opening the camera to sending a video to family',
    es: 'Desde abrir la cámara hasta mandarle un video a la familia',
  },
  lessons: [meetYourPhone, openTheCamera, recordYourFirstVideo, watchItBack, deleteOne, sendItToFamily],
}
