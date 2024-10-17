const songDetail = document.querySelector('[song-detail]');
if (songDetail) {
	const title = songDetail.querySelector('[titleSong]');
	const audio = songDetail.querySelector('[audioSong]');
	const image = songDetail.querySelector('img[src]');
	const singer = songDetail.querySelector('[singerSong]');
	const aplayerLyrics = songDetail.querySelector('[aplayer-lyrics]');
	if (title && audio && image && singer) {
		const titleValue = title.getAttribute('titleSong')
		const audioValue = audio.getAttribute('audioSong')
		const imageValue = image.getAttribute('src')
		const singerValue = singer.getAttribute('singerSong')
		if (aplayerLyrics) {
			const lyrics = aplayerLyrics.getAttribute('aplayer-lyrics') || ''

			if (lyrics) {
				if (titleValue && audioValue && singerValue) {
					const ap = new APlayer({
						container: document.getElementById('aplayer'),
						lrcType: 1,
						audio: [{
							name: titleValue, // tên bài
							artist: singerValue, // ca sĩ
							url: audioValue, // file audio
							cover: imageValue, // ảnh bìa bài hát
							lrc: lyrics
						}],
						autoplay: true
					});

					const aplayerPic = songDetail.querySelector('.aplayer .aplayer-pic')
					aplayerPic.classList.add('animate-spin-slow')
					aplayerPic.classList.add('rounded-[50%]')
					aplayerPic.style.animationPlayState = 'paused';
					let listening = 0;
					let totalTime;
					ap.on('canplay', () => {
						totalTime = parseInt(ap.audio.duration) //273
					})

					ap.on('timeupdate', () => {
						// console.log("thời gian hiện tại là" + ap.audio.currentTime)
						if (ap.audio.currentTime == 0) {
							listening = 0
						}
						if (ap.audio.currentTime == ap.audio.duration) {
							listening = 0
						}
						if (listening == totalTime) {
							// console.log("Chạy vào đây")
							const numberOfListens = songDetail.querySelector('[number-of-listens]');
							if (numberOfListens) {
								const id = numberOfListens.getAttribute('number-of-listens')
								const link = numberOfListens.getAttribute('link')
								if (id && link) {
									fetch(link, {
											method: "PATCH",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({
												id: id
											})
										})
										.then(res => res.json())
										.then(data => {
											if (data.code == 200) {
												numberOfListens.innerHTML = data.numberOfListen
											}
										})
								}
							}
							listening = 0
						}
					})

					ap.on('play', () => {
						// console.log("ok")
						if (aplayerPic) {
							aplayerPic.style.animationPlayState = 'running';
						}

						let listeninginterval = setInterval(() => {
							listening += 1
						}, 1000);
						ap.on('pause', () => {

							clearInterval(listeninginterval)
						})
					});
					// ap.on('ended', () => { //totalTime == listening
						
					// 	listening = 0
					// })

					



					// ap.on('durationchange', () => {
					// 	console.log('hết bài')
					// 	clearTimeout(timeoutListen)
					// 	const numberOfListens = songDetail.querySelector('[number-of-listens]');
					// 		if (numberOfListens) {
					// 			const id = numberOfListens.getAttribute('number-of-listens')
					// 			const link = numberOfListens.getAttribute('link')
					// 			if (id && link) {
					// 				fetch(link, {
					// 						method: "PATCH",
					// 						headers: {
					// 							"Content-Type": "application/json",
					// 						},
					// 						body: JSON.stringify({
					// 							id: id
					// 						})
					// 					})
					// 					.then(res => res.json())
					// 					.then(data => {
					// 						if (data.code == 200) {
					// 							numberOfListens.innerHTML = data.numberOfListen
					// 						}
					// 					})
					// 			}
					// 		}

					// });
					ap.on('pause', () => {
						if (aplayerPic) {
							aplayerPic.style.animationPlayState = 'paused';
						}
					});

					// ap.on('canplay', () => {
					// 	timeoutListen = ap.audio.duration * 9 / 10 * 1000
					// 	totalTime = ap.audio.duration
					// })

				}
			}

		}

	}
	const buttonLike = songDetail.querySelector('[button-like]')
	if (buttonLike) {
		const locals = localStorage.getItem("like");
		if (locals) {
			buttonLike.classList.toggle('fa-regular')
			buttonLike.classList.toggle('fa-solid')
			buttonLike.classList.toggle('text-chu')
		}
		buttonLike.addEventListener('click', () => {
			const id = buttonLike.getAttribute('button-like');
			if (id) {
				const div = buttonLike.nextElementSibling;
				buttonLike.classList.toggle('fa-regular')
				buttonLike.classList.toggle('fa-solid')
				buttonLike.classList.toggle('text-chu')
				if (buttonLike.className.includes('fa-regular')) {
					div.innerHTML = parseInt(div.innerHTML) - 1;
					localStorage.removeItem("like")

				} else {
					div.innerHTML = parseInt(div.innerHTML) + 1
					localStorage.setItem("like", div.innerHTML)
				}

				fetch(`/songs/detail/change-like`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							id: id,
							liked: parseInt(div.innerHTML)
						})
					})
					.then(res => res.json())
					.then(data => {
						if (data.code == 200) {

						}
					})
			}
		});
	}
}

const input = document.querySelector('header form input');
if (input) {
	input.addEventListener('input', () => {
		let link = `/search/suggest?key=${input.value}`
		fetch(link, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(res => res.json())
			.then(data => {
				if (data.code == 200) {
					const appench = document.querySelector('header form [appench-child]');
					if (appench){
						if(data.songs.length > 1){
							const htmlSong = data.songs.map(it => `<div class="flex items-center gap-x-[10px]"> <a class="h-[50px] " href="/songs/detail/${it.slug}"><img class="h-full aspect-square rounded-[10px]" src=${it.avatar} alt=""></a><div class="flex flex-col gap-[10px]"><a href="/songs/detail/${it.slug}" class="font-bold text-chu text-[18px]">${it.title}</a><div class="flex gap-x-[10px] items-center"><div class="fa-regular fa-microphone"></div><div>${it.singer}</div></div></div></div>`)
							appench.innerHTML = htmlSong.join("")
						}
						else{
							appench.innerHTML = ''
						}
					}
				}
			})
	})
}