let doc = document,
	qsa = (s, o = doc) => o.querySelectorAll(s),
	qs = (s, o = doc) => o.querySelector(s);

const handlePromise = async (fn) => {
	try {
		const data = await fn;
		return [data, null];
	} catch (error) {
		return [null, error];
	}
};

const isPromiseFinished = async (promise) => {
	async function delay(milliseconds = 0, returnValue) {
		return new Promise((done) => setTimeout(() => done(returnValue), milliseconds));
	}

	return await Promise.race([
		delay(0, false),
		promise.then(
			() => true,
			() => true
		)
	]);
};

const sleep = (t) => new Promise((r) => setTimeout(r, t));

const processUpload = ({ file, maxSize, allowedTypes } = { file }) => {
	return new Promise((resolve, reject) => {
		const fileSize = file?.size,
			fileType = file?.type,
			fileNameRaw = file?.name.split(' ').join('_'),
			noExtName = fileNameRaw.substr(0, fileNameRaw.lastIndexOf('.')),
			fileName = noExtName ? noExtName : fileNameRaw,
			fileExt = fileType === 'image/jpeg' ? 'jpg' : fileType === 'image/png' ? 'png' : fileType === 'application/pdf' ? 'pdf' : null,
			reader = new FileReader();

		if (!allowedTypes.includes(fileExt) || fileExt === null) reject('file_unsupported');
		if (fileSize > maxSize) reject('file_size_exceeded');

		reader.onload = () => {
			let data = {
				fileSize,
				fileType,
				fileNameRaw,
				noExtName,
				fileName,
				fileExt,
				fileResult: reader.result,
				fileData: file
			};

			resolve(data);
		};

		if (file) reader.readAsDataURL(file);
	});
};

export { handlePromise, isPromiseFinished, processUpload, qs, qsa, sleep };
