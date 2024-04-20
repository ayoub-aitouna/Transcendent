export const oauth2Providers = [
	{
		provider: "google",
		AuthUrl: "https://accounts.google.com/o/oauth2/v2/auth",
		scope: [
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		].join(" "),
		client_id:
			"1057540926258-9c0ibk1bkfogd2fv3hlfk74kauektmel.apps.googleusercontent.com",
	},
	{
		provider: "intra",
		AuthUrl: "https://api.intra.42.fr/oauth/authorize",
		scope: "public",
		client_id:
			"u-s4t2ud-c06179a32fed22ed0c6c8cbebc12db1e4e59d0015b162c5bb93f2f53f21d2770",
	},
];
