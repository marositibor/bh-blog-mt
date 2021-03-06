const header = "bh-blog";

const {
	selectAllPosts,
	selectPublishedPosts,
	insertPost,
	selectPostById,
	selectPostBySlug,
	updatePost
} = require("../services/db-service");

const { orderByYearMonth } = require("../services/post-service");

module.exports = class PostController {
	createNewPost(req, res) {
		if (!req.form.isValid) {
			res.sendStatus(400);
			return;
		}

		const title = req.body.postTitle;
		const content = req.body.postContent;
		const slug = req.body.postSlug;
		const publish = JSON.parse(req.body.publish);
		const author = req.session.username;
		console.log("publish: " + publish);

		const post = {
			author,
			title,
			content,
			slug,
			publish,
			created_at: Date.now()
		};

		insertPost(post).then(() => res.redirect("/admin"));
	}

	getNewPost(req, res) {
		res.render("new_post", {
			header: header
		});
	}

	async getPostList(req, res) {
		const search = req.query.search;
		const postList = await selectPublishedPosts(search);
		const archive = orderByYearMonth(await selectPublishedPosts());

		res.render("postlist", {
			header: header,
			postList,
			search,
			archive
		});
	}

	async getPostListAdmin(req, res) {
		const postList = await selectAllPosts();

		res.render("postlist-admin", {
			header: header,
			postList
		});
	}

	async getPost(req, res) {
		if (!req.params.id) {
			res.redirect("/");
			return;
		}

		if (isNaN(req.params.id)) {
			try {
				const post = await selectPostBySlug(req.params.id);
				res.render("post", {
					header: header,
					post
				});
				return;
			} catch (err) {
				res.sendStatus(404)
				return;
			}
		} else {
			try {
				const post = await selectPostById(req.params.id);
				res.render("post", {
					header: header,
					post
				});
				return
			} catch (err) {
				res.sendStatus(404)
				return;
			}
		}
	}

	editPost(req, res) {
		if (!req.form.isValid) {
			res.sendStatus(400);
			return;
		}

		const id = req.params.id;
		const title = req.body.postTitle;
		const content = req.body.postContent;
		const slug = req.body.postSlug;
		const author = req.session.username;
		const publish = JSON.parse(req.body.publish);

		const post = {
			id,
			author,
			title,
			content,
			slug,
			publish,
			created_at: Date.now()
		};

		updatePost(post).then(() => res.redirect("/admin/post_list"));
	}

	getEditPost(req, res) {
		selectPostById(req.params.id)
			.then(post => {
				res.render("edit_post", {
					header: header,
					post
				});
			})
			.catch(() => {
				res.sendStatus(404);
			});
	}

	validateCreateNewPost(req, res, next) {
		req.form = {};
		const invalidFields = [];
		const publish = req.body.publish ? JSON.parse(req.body.publish) : true;

		if (req.body.postTitle == undefined || req.body.postTitle == "") {
			invalidFields.push("Title is required!");
		}

		if (req.body.postContent == undefined || req.body.postContent == "") {
			invalidFields.push("Content is required!");
		}

		if (publish == false || invalidFields.length == 0) {
			req.form.isValid = true;
			next();
		} else {
			req.form.isValid = false;
			req.form.validationMessage = invalidFields;
			next;
		}
	}
};
