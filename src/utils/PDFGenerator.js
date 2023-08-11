import checkLogo from './checkLogo';
import dayjs from 'dayjs';
import backgroundImage from '../assets/images/certificate-bg.png';
import pdfMake, { fonts } from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import CPFMaskFormat from './CPFMaskFormat';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function pdfGen(data) {
  const { event, logo, startsAt, endsAt, ticketType, user } = data;
  const startDate = dayjs(startsAt).format('DD/MM/YYYY');
  const endDate = dayjs(endsAt).format('DD/MM/YYYY');

  const imgCheck = await checkLogo(logo);
  const logoImage = await imageTransform(imgCheck, 117, 117);

  const resizedImageUrl = await imageTransform(backgroundImage, 841.89, 595.28);

  pdfMake.fonts = {
    Roboto: {
      normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
  };

  const docDefinition = {
    content: [
      { image: resizedImageUrl, absolutePosition: { x: 0, y: 0 } },
      { text: 'CERTIFICADO', style: ['page', 'header', 'aligcenter'] },
      { text: 'Certificamos, para todos os  devidos fins, de que a(o):', style: ['page', 'aligcenter', 'text'] },
      { text: `${user.name}`, style: ['page', 'user', 'aligcenter'] },
      {
        text: `Com documento ${CPFMaskFormat(user.cpf)} participou do evento ${event}, de forma 
        ${ticketType === 'ONLINE' ? ticketType : 'PRESENCIAL'}, entre os dias ${startDate} e ${endDate}.`,
        marginLeft: 168,
        style: ['page', 'text', 'aligjust'],
      },
      {
        image: 'eventLogo',
        width: 117,
        height: 117,
        border: 48.5,
        fit: [100, 100],
        style: ['logo'],
      },
    ],
    pageOrientation: 'landscape',
    backgroundColor: '#CECECE',

    pageMargins: [40, 40, 40, 40],

    defaultStyle: { font: 'Roboto' },

    styles: {
      header: {
        fontSize: 80,
        bold: true,
        marginBottom: 31,
      },
      text: {
        fontSize: 14,
      },
      page: {
        marginLeft: 55,
      },
      aligcenter: {
        alignment: 'center',
      },
      aligjust: {
        marginLeft: 107,
      },
      user: {
        marginTop: 31,
        marginBottom: 31,
        bold: true,
        fontSize: 70,
      },
      logo: {
        marginTop: 47,
        marginLeft: 365,
        width: 117,
        height: 117,
      },
    },

    images: {
      eventLogo: {
        url: logoImage,
      },
    },
  };

  const pdfGenerator = pdfMake.createPdf(docDefinition, null, fonts);
  pdfGenerator.getBlob((blob) => {
    const pdfURL = URL.createObjectURL(blob);

    window.open(pdfURL);
  });
}

async function imageTransform(image, width, height) {
  const response = await fetch(image);
  const blob = await response.blob();
  return await resizeImage(blob, width, height);
}

async function resizeImage(imageBlob, maxWidth, maxHeight) {
  return await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = URL.createObjectURL(imageBlob);
  });
}
