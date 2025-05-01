pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            from(files("libs.versions.toml")) // Ajusta el path si tu proyecto lo necesita
        }
    }
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "TesisApp"
include(":app")
