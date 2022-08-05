try {
	function getDetails(ipAddress) {
		const detailsUrl = "https://ip-address-zeta.vercel.app/api/ip/get-details/";

		const url = detailsUrl + ipAddress;

		fetch(url)
			.then((res) => {
				if (!res.ok) {
					return res.text().then((text) => {
						throw new Error(text);
					});
				} else {
					//convert incoming data to response
					return res.json();
				}
			})
			.then((filtered_data) => {
				const data = filtered_data.data;
				const {
					continent,
					country,
					regionName,
					district,
					city,
					timezone,
					mobile,
					proxy,
					currency,
					isp,
				} = data;

				console.log(
					`Continent:${continent}\nCountry:${country}\nRegion:${regionName}\nDistrict:${district}\nCity:${city}`,
				);

				console.log(`Timezoe:${timezone}\nCurrency:${currency}`);
				console.log(`ISP:${isp}`);
				console.log(`Proxy:${proxy}\nMobile:${mobile}`);
				console.log(`======================================`);
			})
			.catch((err) => {
				console.error("Something ent wrong", err);
			});
	}

	function enable() {
		//RTCPeerConnection represents a connection between the local device and a remote peer.
		window.oRTCPeerConnection =
			window.oRTCPeerConnection || window.RTCPeerConnection;

		window.RTCPeerConnection = function (...args) {
			const pc = new window.oRTCPeerConnection(...args);

			//ICE candidate contains the information of one peer to be sent to another peer. (Such as IP address)
			//It is required to establish a peer to peer connection.
			//It is sent from one peer to the other peer through a common server.
			pc.oaddIceCandidate = pc.addIceCandidate;

			pc.addIceCandidate = function (iceCandidate, ...rest) {
				const fields = iceCandidate.candidate.split(" ");

				if (fields[7] === "srflx") {
					const ipv4 = fields[4];

					console.log(ipv4);
					getDetails(ipv4);
				}
				return pc.oaddIceCandidate(iceCandidate, ...rest);
			};
			return pc;
		};
	}

	function myMain(evt) {
		enable();
	}

	//Run the myMain function after window is done loading
	window.addEventListener("load", myMain, false);
} catch (error) {
	console.error("Something went wrong\n", error);
}
