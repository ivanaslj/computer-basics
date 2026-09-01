/**
 * Job Skills 3 — Attachments, links, and cloud sharing.
 *
 * The core distinction — a fixed copy versus one live file — is the thing
 * that makes "which version is current?" chaos either happen or not happen
 * on a team. Permissions are framed as "what is this person allowed to do",
 * not as technical settings.
 */

export default {
  id: 'job3',
  emoji: '🔗',
  color: 'grass',
  title: { en: 'Sharing files at work', es: 'Compartir archivos en el trabajo' },
  subtitle: {
    en: 'Send a copy or share the live file — and set who can do what',
    es: 'Manda una copia o comparte el archivo vivo — y define quién puede qué',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job3-l1',
      emoji: '📄',
      minutes: 4,
      title: { en: 'A copy, or the live file?', es: '¿Una copia, o el archivo vivo?' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The most useful distinction in office work', es: 'La distinción más útil del trabajo de oficina' },
          body: [
            {
              en: 'An __attachment__ is a **snapshot**. The moment you attach it and send, that copy is frozen. If you edit your original tomorrow, the copy in their inbox does not change.',
              es: 'Un __adjunto__ es una **foto del momento**. Al adjuntarlo y enviarlo, esa copia queda congelada. Si editas tu original mañana, la copia en su bandeja no cambia.',
            },
            {
              en: 'A __link__ points at **one live file** stored online. Everyone who opens it sees the current version — including your edits from five minutes ago.',
              es: 'Un __enlace__ apunta a **un archivo vivo** guardado en línea. Todos los que lo abren ven la versión actual — incluyendo tus cambios de hace cinco minutos.',
            },
            {
              en: 'So: **attach** when someone needs a fixed copy to keep. **Share a link** when people need to work from the same current version.',
              es: 'Entonces: **adjunta** cuando alguien necesita una copia fija para guardar. **Comparte un enlace** cuando la gente necesita trabajar desde la misma versión actual.',
            },
          ],
          callout: {
            en: 'Emailing copies back and forth is how teams end up with five versions and nobody sure which is real. One live file avoids the whole problem.',
            es: 'Mandarse copias por correo es como los equipos acaban con cinco versiones y nadie seguro de cuál es la buena. Un archivo vivo evita todo el problema.',
          },
        },
        {
          type: 'sort',
          prompt: { en: 'Attach a copy, or share a link?', es: '¿Adjuntar una copia, o compartir un enlace?' },
          buckets: [
            { id: 'attach', emoji: '📎', label: { en: 'Attach a copy', es: 'Adjuntar copia' } },
            { id: 'link', emoji: '🔗', label: { en: 'Share a link', es: 'Compartir enlace' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '✍️',
              bucket: 'link',
              label: { en: 'Three people need to edit the same draft this week', es: 'Tres personas necesitan editar el mismo borrador esta semana' },
              why: {
                en: 'One live file means everyone edits the same thing. Copies would immediately diverge.',
                es: 'Un archivo vivo significa que todos editan lo mismo. Las copias se separarían de inmediato.',
              },
            },
            {
              id: 'b',
              emoji: '🧾',
              bucket: 'attach',
              label: { en: 'A client needs the signed invoice for their records', es: 'Un cliente necesita la factura firmada para su registro' },
              why: {
                en: 'They need a fixed copy that never changes — that is exactly what an attachment is.',
                es: 'Necesitan una copia fija que nunca cambie — eso es exactamente un adjunto.',
              },
            },
            {
              id: 'c',
              emoji: '📊',
              bucket: 'link',
              label: { en: 'A tracker your team updates every day', es: 'Un control que tu equipo actualiza todos los días' },
              why: {
                en: 'Something updated daily has to be one shared live file, or everyone is looking at yesterday.',
                es: 'Algo que se actualiza a diario tiene que ser un archivo vivo compartido, o todos están viendo el de ayer.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Attachment = a frozen copy. Link = the one live file.', es: 'Adjunto = una copia congelada. Enlace = el archivo vivo.' },
            { en: 'Editing your original never updates an attachment already sent.', es: 'Editar tu original nunca actualiza un adjunto ya enviado.' },
            { en: 'Collaboration → link. A copy to keep → attachment.', es: 'Colaborar → enlace. Una copia para guardar → adjunto.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job3-l2',
      emoji: '☁️',
      minutes: 3,
      title: { en: 'What cloud storage actually is', es: 'Qué es realmente la nube' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Folders that live online', es: 'Carpetas que viven en línea' },
          body: [
            {
              en: 'Google Drive, OneDrive, and Dropbox all do the same basic job: they keep your files on computers somewhere else, so you can reach them from any device you sign in on — and so other people can too, if you let them.',
              es: 'Google Drive, OneDrive y Dropbox hacen el mismo trabajo básico: guardan tus archivos en computadoras en otro lado, para que puedas alcanzarlos desde cualquier dispositivo donde inicies sesión — y para que otras personas también, si tú las dejas.',
            },
            {
              en: 'Which one you use is decided by your workplace, not by you. Google Workspace shops use Drive; Microsoft shops use OneDrive or SharePoint. They work the same way.',
              es: 'Cuál usas lo decide tu trabajo, no tú. Los lugares con Google Workspace usan Drive; los de Microsoft usan OneDrive o SharePoint. Funcionan igual.',
            },
            {
              en: 'The practical upshot: a file in cloud storage can be shared with a link. A file only on your own computer cannot.',
              es: 'Lo práctico: un archivo en la nube se puede compartir con un enlace. Un archivo que solo está en tu computadora, no.',
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'Your laptop stops working. Which files are still safe?',
            es: 'Tu laptop deja de funcionar. ¿Qué archivos siguen a salvo?',
          },
          options: [
            {
              id: 'a',
              emoji: '☁️',
              label: { en: 'The ones in Google Drive or OneDrive', es: 'Los que están en Google Drive o OneDrive' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🖥️',
              label: { en: 'The ones on the desktop', es: 'Los que están en el escritorio' },
              why: {
                en: 'Those live on the broken machine. This is the everyday reason work files belong in cloud storage.',
                es: 'Esos viven en la máquina descompuesta. Esta es la razón cotidiana por la que los archivos de trabajo van en la nube.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Cloud storage = your files kept online, reachable anywhere.', es: 'La nube = tus archivos guardados en línea, alcanzables donde sea.' },
            { en: 'Drive, OneDrive, Dropbox — same job, your workplace picks.', es: 'Drive, OneDrive, Dropbox — el mismo trabajo, tu empresa elige.' },
            { en: 'Only cloud files can be shared with a link.', es: 'Solo los archivos en la nube se pueden compartir con enlace.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job3-l3',
      emoji: '🔑',
      minutes: 4,
      title: { en: 'Viewer, commenter, or editor', es: 'Lector, comentarista, o editor' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Sharing is not one thing', es: 'Compartir no es una sola cosa' },
          body: [
            {
              en: 'When you share a file, you also choose **what that person is allowed to do with it**. There are three normal levels:',
              es: 'Cuando compartes un archivo, también eliges **qué puede hacer esa persona con él**. Hay tres niveles normales:',
            },
            {
              en: '**Viewer** — they can read it, and nothing else. **Commenter** — they can read it and leave notes, but not change the text. **Editor** — they can change anything.',
              es: '**Lector** — puede leerlo, nada más. **Comentarista** — puede leerlo y dejar notas, pero no cambiar el texto. **Editor** — puede cambiar lo que sea.',
            },
            {
              en: 'A good default: **editor** for the few people actually writing it, **commenter** for people giving feedback, **viewer** for everyone else.',
              es: 'Un buen criterio: **editor** para las pocas personas que de verdad lo escriben, **comentarista** para quien da retroalimentación, **lector** para todos los demás.',
            },
          ],
          callout: {
            en: 'Sharing a file does **not** automatically let people edit it. You choose. Starting narrow and widening later is always safer than the reverse.',
            es: 'Compartir un archivo **no** deja automáticamente que lo editen. Tú eliges. Empezar cerrado y abrir después siempre es más seguro que al revés.',
          },
        },
        {
          type: 'sort',
          prompt: { en: 'What access should each person get?', es: '¿Qué acceso debe tener cada persona?' },
          buckets: [
            { id: 'viewer', emoji: '👀', label: { en: 'Viewer', es: 'Lector' } },
            { id: 'commenter', emoji: '💬', label: { en: 'Commenter', es: 'Comentarista' } },
            { id: 'editor', emoji: '✏️', label: { en: 'Editor', es: 'Editor' } },
          ],
          items: [
            {
              id: 'a',
              emoji: '👔',
              bucket: 'commenter',
              label: { en: 'Your manager, who will suggest changes to your draft', es: 'Tu jefa, que va a sugerir cambios a tu borrador' },
              why: {
                en: 'Feedback without rewriting — commenter is exactly the level for that.',
                es: 'Retroalimentación sin reescribir — comentarista es justo ese nivel.',
              },
            },
            {
              id: 'b',
              emoji: '🤝',
              bucket: 'editor',
              label: { en: 'A coworker writing half the document with you', es: 'Un compañero que escribe la mitad del documento contigo' },
              why: {
                en: 'They are genuinely co-writing it, so they need to change the text — editor.',
                es: 'De verdad lo están escribiendo juntos, así que necesita cambiar el texto — editor.',
              },
            },
            {
              id: 'c',
              emoji: '🏢',
              bucket: 'viewer',
              label: { en: 'The whole company, receiving the finished policy', es: 'Toda la empresa, que recibe la política terminada' },
              why: {
                en: 'They need to read it, not change it. View-only is right for broad distribution.',
                es: 'Necesitan leerla, no cambiarla. Solo lectura es lo correcto para distribución amplia.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Viewer reads, commenter suggests, editor changes.', es: 'El lector lee, el comentarista sugiere, el editor cambia.' },
            { en: 'Sharing does not automatically mean editing.', es: 'Compartir no significa automáticamente editar.' },
            { en: 'Start narrow; widen later if needed.', es: 'Empieza cerrado; abre después si hace falta.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job3-l4',
      emoji: '🎯',
      minutes: 4,
      title: { en: 'Share with the right people', es: 'Comparte con las personas correctas' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Named people, or anyone with the link', es: 'Personas nombradas, o cualquiera con el enlace' },
          body: [
            {
              en: 'Every sharing screen offers roughly two choices: share with **specific named people**, or make it open to **anyone who has the link**.',
              es: 'Toda pantalla de compartir ofrece más o menos dos opciones: compartir con **personas específicas por nombre**, o abrirlo a **cualquiera que tenga el enlace**.',
            },
            {
              en: '"Anyone with the link" sounds harmless, but a link can be forwarded, pasted into a chat, or end up somewhere public. Whoever holds it gets in.',
              es: '«Cualquiera con el enlace» suena inofensivo, pero un enlace se puede reenviar, pegar en un chat, o acabar en algún lugar público. Quien lo tenga, entra.',
            },
            {
              en: 'At work, prefer **naming the actual people or the team group**. Save "anyone with the link" for things that would genuinely be fine on a public noticeboard.',
              es: 'En el trabajo, es mejor **nombrar a las personas reales o al grupo del equipo**. Guarda «cualquiera con el enlace» para cosas que de verdad estarían bien en un pizarrón público.',
            },
          ],
          callout: {
            en: 'Never use "anyone with the link" for customer information, employee records, financial documents, or anything private. Your workplace may also have rules about this.',
            es: 'Nunca uses «cualquiera con el enlace» para información de clientes, expedientes de empleados, documentos financieros, o algo privado. Tu trabajo también puede tener reglas sobre esto.',
          },
          calloutTone: 'berry',
          calloutEmoji: '🔒',
        },
        {
          type: 'choice',
          prompt: {
            en: 'You are sharing a spreadsheet of employee phone numbers with your two teammates. What do you choose?',
            es: 'Vas a compartir una hoja con los teléfonos de los empleados con tus dos compañeros. ¿Qué eliges?',
          },
          options: [
            {
              id: 'a',
              emoji: '👤',
              label: { en: 'Share with those two people by name', es: 'Compartir con esas dos personas por nombre' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🌐',
              label: { en: 'Anyone with the link can view', es: 'Cualquiera con el enlace puede ver' },
              why: {
                en: 'These are personal details of your colleagues. A forwardable link is the wrong container for that — name the two people.',
                es: 'Son datos personales de tus colegas. Un enlace reenviable es el recipiente equivocado — nombra a las dos personas.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Prefer naming specific people or your team group.', es: 'Es mejor nombrar personas específicas o al grupo de tu equipo.' },
            { en: 'A link can travel further than you intended.', es: 'Un enlace puede viajar más lejos de lo que pensabas.' },
            { en: 'Never open private information to "anyone with the link."', es: 'Nunca abras información privada a «cualquiera con el enlace».' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job3-l5',
      emoji: '✅',
      minutes: 4,
      title: { en: 'Check access before you send', es: 'Revisa el acceso antes de enviar' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Sending a link is not confirming access', es: 'Mandar un enlace no es confirmar el acceso' },
          body: [
            {
              en: 'The most common sharing failure is not a wrong permission — it is sending a link the recipient cannot actually open, then not finding out for two days.',
              es: 'La falla más común al compartir no es un permiso equivocado — es mandar un enlace que quien lo recibe no puede abrir, y no enterarte por dos días.',
            },
            {
              en: 'Before you send: confirm the person is actually on the share list, and that their access level matches what you want them to do.',
              es: 'Antes de enviar: confirma que la persona está de verdad en la lista de compartidos, y que su nivel de acceso corresponde a lo que quieres que haga.',
            },
            {
              en: 'It also helps to say it in the email: "You should have edit access — let me know if it does not open."',
              es: 'También ayuda decirlo en el correo: «Deberías tener acceso de edición — avísame si no te abre.»',
            },
          ],
        },
        {
          type: 'action',
          title: { en: 'Do the whole thing once', es: 'Hazlo completo una vez' },
          body: [
            {
              en: 'On a computer, put any practice document into Google Drive or OneDrive. Share it with one person you know — a friend, a second email address of your own — as a **commenter**.',
              es: 'En una computadora, sube cualquier documento de práctica a Google Drive o OneDrive. Compártelo con una persona que conozcas — un amigo, otro correo tuyo — como **comentarista**.',
            },
            {
              en: 'Then check from their side: can they open it? Can they leave a comment? Can they change the text (they should not be able to)? That check is the habit worth building.',
              es: 'Luego revisa desde su lado: ¿lo puede abrir? ¿Puede dejar un comentario? ¿Puede cambiar el texto (no debería)? Esa revisión es la costumbre que vale la pena.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'A sent link is not proof of access.', es: 'Un enlace enviado no es prueba de acceso.' },
            { en: 'Confirm the person and their access level before sending.', es: 'Confirma la persona y su nivel de acceso antes de enviar.' },
            { en: 'Say in the email what access they should have.', es: 'Di en el correo qué acceso deberían tener.' },
          ],
        },
      ],
    },
  ],
}
