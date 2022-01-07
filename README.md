# Lottie custom block

This block allows the user to add Lottie JSON animation https://lottiefiles.com/. It is a lightweight animation defined in JSON form. Using the editor view, the user is able to define how will the animation be displayed on the website by changing configuring it in the editor sidebar.

In order to use it, the Lottie player script must be enqueued. This block is tested with https://unpkg.com/@lottiefiles/lottie-player@1.5.4/dist/lottie-player.js.

## Block properties

- Block name: *create-block/lottiee*
- Child or parent blocks: *none*
## Block settings

Once the 'Lottie' custom block is added to the editor view, the user will be able to adjust how will the animation be displayed in the right sidebar. The list of available options is detailed in the text below.
- *Autoplay* - Allows starting animation on page load.
- *Controls* - Allows the use of animation player controls. With it, the user can play, pause or stop the animation.
- *Loop* - Allows repeating animation after it is finished. Turning off this option will play animation only once.
- *JSON* - Lottie JSON animation code should be placed here.
- *Max height* - Allows the user to specify the maximum height of the animation player.

# Requirements

To be able to run this project you need to have Node and Docker installed. This project is tested with node version v16.13.1 on Macbook M1 pro laptop.

# Installation

Install node packages with
`npm run install`

Install composer packages with
`composer install`

# Running the environment

Execute `npm run wp-env start` to start WordPress environment and `npm run wp-env stop` to stop it. When running it will be available on http://localhost:8888/.

Username: *admin*
Password: *password*

If there is already some existing project environment running on port 8888, either stop that environment (all files and database will remain) or provide custom port in .wp-env.json file by adding

```
{
    "core": "./tools/wordpress",
    "port": 8222,
    "testsPort": 8223,
    "plugins": [
        "."
    ]
}
```

# Building the assets

To build assets for production:
`npm run build`

For building assets while developing:
`npm run dev`

# Running tests

To be able to run tests please run `npm run test-e2e`.
To run the tests in with puppetier using interactive mode run `npm run test-e2e:watch`

# Linters

To check CSS, JS and PHP code run `npm run lint`

## License

MIT
