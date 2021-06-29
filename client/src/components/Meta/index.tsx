import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const Meta = ({
  title,
  description = 'Encuentre un apartamento, condominio, espacio de oficina, casa y lote en venta o alquiler en las mejores ubicaciones. Buscador de propiedades inmobiliarias certificado # 1 en Colombia',
  image,
  url,
}: Props) => {
  const metaImageFb = image && <meta property="og:image" content={image} />;
  const metaUrlFb = url && <meta property="og:url" content={url} />;
  const metaImageTwitter = image && (
    <meta name="twitter:image" content={image} />
  );
  const metaUrlTwitter = image && (
    <meta name="twitter:card" content="summary_large_image" />
  );

  return (
    <Helmet>
      <title>{`YourHouse`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {metaImageFb}
      {metaUrlFb}
      {metaImageTwitter}
      {metaUrlTwitter}
    </Helmet>
  );
};

export default Meta;
