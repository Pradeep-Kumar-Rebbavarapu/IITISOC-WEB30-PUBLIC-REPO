import Docxtemplater from 'docxtemplater';
import { Readable } from 'stream';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { htmlString } = req.body;

    const doc = new Docxtemplater();
    doc.loadHtml(htmlString, { parserOptions: { decodeEntities: true } });
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    res.setHeader('Content-Disposition', 'attachment; filename="output.docx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    stream.pipe(res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
