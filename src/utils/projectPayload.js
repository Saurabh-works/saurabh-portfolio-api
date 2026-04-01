const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeUrl = (value = '') => {
  const trimmed = value.toString().trim();

  if (!trimmed) {
    return '';
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const normalizeProjectPayload = (body, file) => {
  const payload = {
    ...body,
    slug: body.slug || slugify(body.title),
    liveUrl: normalizeUrl(body.liveUrl),
    githubUrl: normalizeUrl(body.githubUrl)
  };

  if (file) {
    payload.image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  }

  return payload;
};

module.exports = { normalizeProjectPayload };
