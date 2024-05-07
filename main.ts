namespace SpriteKind {
    export const costume = SpriteKind.create()
    export const coin = SpriteKind.create()
    export const portal = SpriteKind.create()
    export const fire = SpriteKind.create()
    export const passivefire = SpriteKind.create()
    export const udplayer = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    info.setLife(10)
    next_level()
})
sprites.onOverlap(SpriteKind.udplayer, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
controller.combos.attachCombo("ddlldduu", function () {
    tiles.setCurrentTilemap(tilemap`level17`)
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        coins = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 5 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 7 7 7 7 5 5 f . . . 
            . . f 5 5 7 f 7 7 f 7 5 5 f . . 
            . . f 5 5 5 7 7 2 7 5 5 5 f . . 
            . . f 5 5 5 5 7 7 5 5 5 6 f . . 
            . . f 5 5 5 5 7 7 5 5 5 7 f . . 
            . . f 5 5 5 5 7 7 7 7 5 7 f . . 
            . . f 5 5 5 5 7 7 7 7 7 7 f . . 
            . . f 5 5 5 5 5 7 7 7 7 5 f . . 
            . . . f 5 5 5 5 5 5 5 5 5 f . . 
            . . . f 5 5 5 5 5 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . . f f f f f f 1 . . . . 
            `, SpriteKind.coin)
        tiles.placeOnTile(coins, value)
        tiles.setTileAt(value, sprites.dungeon.floorDark2)
    }
})
scene.onOverlapTile(SpriteKind.udplayer, assets.tile`myTile6`, function (sprite, location) {
    info.setLife(10)
    next_level()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    snake_player.setKind(SpriteKind.udplayer)
    snake_player.ay = -300
    snake_player.setPosition(55, 4)
    snake_player.setImage(img`
        . . . c c c c c c c c c c . . . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        . . c c c f 6 7 7 c c c c f . . 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . . . c c c c c c . . . 
        `)
    controller.moveSprite(snake_player, 100, 0)
    tiles.placeOnTile(snake_player, tiles.getTileLocation(55, 3))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_player.vy == 0 && snake_player.kind() == SpriteKind.Player) {
        snake_player.vy = -200
    }
    if (snake_player.kind() == SpriteKind.udplayer && snake_player.vy == 0) {
        reverse_jump()
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    info.changeLifeBy(-1)
    snake_player.setPosition(23, 26)
    pause(100)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    info.setLife(10)
    next_level()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_player.image == img`
        . . . c c c c c c c c c c . . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . . f c c c c 7 7 6 f c c c . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . . . c c c c c c . . . . . . . 
        `) {
        snake_player.setImage(img`
            . . . c c c c c c c c c c . . . 
            . . c c 6 6 7 1 1 1 1 1 6 c . . 
            . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
            . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
            c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
            c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
            . c 7 7 7 c c f 7 7 7 2 6 c . . 
            . . c c c f 6 7 7 c c c c f . . 
            . . . . f 6 7 7 c 6 7 7 7 7 f . 
            . . . . f 7 7 7 7 7 7 7 7 7 7 f 
            . . . . f 7 7 7 6 f 6 6 f 6 7 f 
            . . . . c 7 7 7 c 6 6 6 6 c 7 c 
            . . . . c 6 7 7 7 7 7 7 7 7 6 c 
            . . . . . c 7 7 7 7 7 7 7 7 c . 
            . . . . . . c 6 7 7 7 7 6 c . . 
            . . . . . . . c c c c c c . . . 
            `)
    }
    if (level > -1) {
        snake_player.setImage(img`
            . . . c c c c c c . . . . . . . 
            . . c 6 7 7 7 7 6 c . . . . . . 
            . c 7 7 7 7 7 7 7 7 c . . . . . 
            c 6 7 7 7 7 7 7 7 7 6 c . . . . 
            c 7 c 6 6 6 6 c 7 7 7 c . . . . 
            f 7 6 f 6 6 f 6 7 7 7 f . . . . 
            f 7 7 7 7 7 7 7 7 7 7 f . . . . 
            . f 7 7 7 7 6 c 7 7 6 f . . . . 
            . . f c c c c 7 7 6 f c c c . . 
            . . c 6 2 7 7 7 f c c 7 7 7 c . 
            . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
            . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
            . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
            . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
            . . c 6 1 1 1 1 1 7 6 6 c c . . 
            . . . c c c c c c c c c c . . . 
            `)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.fire, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    tiles.placeOnTile(snake_player, tiles.getTileLocation(8, 6))
})
function next_level () {
    level += 1
    if (level == 1) {
        sprites.destroyAllSpritesOfKind(SpriteKind.coin)
        tiles.setCurrentTilemap(tilemap`level3`)
        tiles.placeOnTile(snake_player, tiles.getTileLocation(8, 5))
        tiles.placeOnRandomTile(portal_lvl_1_lvl_2, assets.tile`myTile6`)
        scene.setBackgroundColor(1)
        sprites.destroyAllSpritesOfKind(SpriteKind.udplayer)
        for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
            coins = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . f 5 5 5 5 f . . . . . 
                . . . . f 5 5 5 5 5 5 f . . . . 
                . . . f 5 5 7 7 7 7 5 5 f . . . 
                . . f 5 5 7 f 7 7 f 7 5 5 f . . 
                . . f 5 5 5 7 7 2 7 5 5 5 f . . 
                . . f 5 5 5 5 7 7 5 5 5 6 f . . 
                . . f 5 5 5 5 7 7 5 5 5 7 f . . 
                . . f 5 5 5 5 7 7 7 7 5 7 f . . 
                . . f 5 5 5 5 7 7 7 7 7 7 f . . 
                . . f 5 5 5 5 5 7 7 7 7 5 f . . 
                . . . f 5 5 5 5 5 5 5 5 5 f . . 
                . . . f 5 5 5 5 5 5 5 5 f . . . 
                . . . . f 5 5 5 5 5 5 f . . . . 
                . . . . . f f f f f f 1 . . . . 
                `, SpriteKind.coin)
            tiles.placeOnTile(coins, value)
            tiles.setTileAt(value, sprites.dungeon.floorDark2)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
            fire = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . 3 . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.fire)
            animation.runImageAnimation(
            fire,
            [img`
                . . . . 4 . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . 4 . . . 4 . . 
                . 4 . . . . . 2 . . . . . 4 . . 
                . . . 4 4 4 2 4 2 . . . 4 . . . 
                . . . . . 4 4 4 4 2 . 4 . . . . 
                4 . . . . 2 4 4 4 4 4 . . . . . 
                . 4 4 4 4 2 4 4 4 4 2 . . . . . 
                . . . . . 2 4 4 4 4 4 2 . . . . 
                . 4 . . 2 4 4 4 4 4 4 2 . . . 4 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                . . 4 4 4 4 4 4 4 4 4 4 2 . . . 
                . 4 . 2 4 5 5 5 5 5 4 4 2 . . . 
                . . . 2 4 5 8 8 8 5 5 4 2 . . . 
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                `,img`
                . . . 4 . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 4 . . . . . . . . 
                . . . . . . . 4 . . . . 4 . . . 
                . 4 . . 2 2 4 4 4 . . . . . . . 
                . . . 2 4 2 4 . . . . . . . . . 
                . . 4 2 4 4 4 2 . . . 4 . . . 4 
                . . 2 2 4 4 4 2 2 . . . . . 4 . 
                . . 2 4 4 4 4 4 2 2 . . . 4 4 . 
                . . 2 4 4 4 4 4 4 2 2 . . 4 . . 
                . . 2 4 4 4 4 4 4 4 2 2 4 . . . 
                4 . 2 4 4 4 4 4 4 4 4 4 . . . . 
                . . 2 4 4 4 4 4 4 4 4 4 2 . 4 . 
                . . 2 4 4 5 5 5 4 4 4 4 2 . . . 
                . . 2 2 5 8 8 8 5 4 4 4 2 . . . 
                . . . 2 5 8 8 8 8 5 4 4 2 . . . 
                `,img`
                . . . . 4 . . . . . . . . . . . 
                . . . . . . . . . . 4 . . . . . 
                . . . . . . . . . . 4 . . . . . 
                . . . 4 . . . . . 4 4 . . 4 . . 
                . 4 . . . . . 2 . 4 . . . . . . 
                . . . . . . 2 4 2 4 . . . . 4 . 
                . . 4 . . . 2 4 4 4 . . . 4 4 . 
                . . . 4 4 2 4 4 4 2 . . . 4 . . 
                . . . . . 4 4 4 4 4 2 . 4 . . . 
                . . . . . 2 4 4 4 4 4 4 4 . . . 
                . 4 . . 2 4 4 4 4 4 4 4 . . . 4 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                . . . 2 2 4 4 4 4 4 4 4 2 . . . 
                . . . 2 4 5 5 5 5 5 4 4 2 . . . 
                . . . 2 4 5 8 8 8 5 5 4 2 . . . 
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                `,img`
                . . . . . . . . . . . . 4 . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . 4 4 . . . . . . 
                . . . 4 . . . . . 4 . . . . . . 
                . . . . . . . 4 . 4 2 2 . . 4 . 
                . 4 4 . . . . . . 4 2 4 2 . . . 
                . . 4 . 4 . . . 2 2 4 4 2 4 . . 
                . 4 4 4 4 . . 2 2 4 4 4 2 4 4 . 
                . . . . 4 4 4 2 4 4 4 4 4 2 4 4 
                . . . . . 2 4 4 4 4 4 4 4 2 . 4 
                . . . . 2 2 4 4 4 4 4 4 4 2 4 . 
                . . . . 2 4 4 4 4 4 4 4 4 4 4 4 
                . 4 . 2 4 4 4 4 4 4 4 4 4 2 . . 
                . . . 2 4 4 4 4 5 5 5 4 4 2 . . 
                . . . 2 4 4 4 5 8 8 8 5 2 2 . . 
                . . . 2 4 4 5 8 8 8 8 5 2 . . . 
                `],
            500,
            true
            )
            tiles.placeOnTile(fire, value)
            tiles.setTileAt(value, sprites.dungeon.floorDark2)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile12`)) {
            fire = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . 3 3 . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.passivefire)
            animation.runImageAnimation(
            fire,
            [img`
                . . . . 4 . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . 4 . . . 4 . . 
                . 4 . . . . . 2 . . . . . 4 . . 
                . . . 4 4 4 2 4 2 . . . 4 . . . 
                . . . . . 4 4 4 4 2 . 4 . . . . 
                4 . . . . 2 4 4 4 4 4 . . . . . 
                . 4 4 4 4 2 4 4 4 4 2 . . . . . 
                . . . . . 2 4 4 4 4 4 2 . . . . 
                . 4 . . 2 4 4 4 4 4 4 2 . . . 4 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                . . 4 4 4 4 4 4 4 4 4 4 2 . . . 
                . 4 . 2 4 5 5 5 5 5 4 4 2 . . . 
                . . . 2 4 5 8 8 8 5 5 4 2 . . . 
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                `,img`
                . . . 4 . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 4 . . . . . . . . 
                . . . . . . . 4 . . . . 4 . . . 
                . 4 . . 2 2 4 4 4 . . . . . . . 
                . . . 2 4 2 4 . . . . . . . . . 
                . . 4 2 4 4 4 2 . . . 4 . . . 4 
                . . 2 2 4 4 4 2 2 . . . . . 4 . 
                . . 2 4 4 4 4 4 2 2 . . . 4 4 . 
                . . 2 4 4 4 4 4 4 2 2 . . 4 . . 
                . . 2 4 4 4 4 4 4 4 2 2 4 . . . 
                4 . 2 4 4 4 4 4 4 4 4 4 . . . . 
                . . 2 4 4 4 4 4 4 4 4 4 2 . 4 . 
                . . 2 4 4 5 5 5 4 4 4 4 2 . . . 
                . . 2 2 5 8 8 8 5 4 4 4 2 . . . 
                . . . 2 5 8 8 8 8 5 4 4 2 . . . 
                `,img`
                . . . . 4 . . . . . . . . . . . 
                . . . . . . . . . . 4 . . . . . 
                . . . . . . . . . . 4 . . . . . 
                . . . 4 . . . . . 4 4 . . 4 . . 
                . 4 . . . . . 2 . 4 . . . . . . 
                . . . . . . 2 4 2 4 . . . . 4 . 
                . . 4 . . . 2 4 4 4 . . . 4 4 . 
                . . . 4 4 2 4 4 4 2 . . . 4 . . 
                . . . . . 4 4 4 4 4 2 . 4 . . . 
                . . . . . 2 4 4 4 4 4 4 4 . . . 
                . 4 . . 2 4 4 4 4 4 4 4 . . . 4 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                . . . 2 2 4 4 4 4 4 4 4 2 . . . 
                . . . 2 4 5 5 5 5 5 4 4 2 . . . 
                . . . 2 4 5 8 8 8 5 5 4 2 . . . 
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                `,img`
                . . . . . . . . . . . . 4 . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . 4 4 . . . . . . 
                . . . 4 . . . . . 4 . . . . . . 
                . . . . . . . 4 . 4 2 2 . . 4 . 
                . 4 4 . . . . . . 4 2 4 2 . . . 
                . . 4 . 4 . . . 2 2 4 4 2 4 . . 
                . 4 4 4 4 . . 2 2 4 4 4 2 4 4 . 
                . . . . 4 4 4 2 4 4 4 4 4 2 4 4 
                . . . . . 2 4 4 4 4 4 4 4 2 . 4 
                . . . . 2 2 4 4 4 4 4 4 4 2 4 . 
                . . . . 2 4 4 4 4 4 4 4 4 4 4 4 
                . 4 . 2 4 4 4 4 4 4 4 4 4 2 . . 
                . . . 2 4 4 4 4 5 5 5 4 4 2 . . 
                . . . 2 4 4 4 5 8 8 8 5 2 2 . . 
                . . . 2 4 4 5 8 8 8 8 5 2 . . . 
                `],
            500,
            true
            )
            tiles.placeOnTile(fire, value)
            tiles.setTileAt(value, sprites.dungeon.floorDark2)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile15`)) {
            udfire = sprites.create(img`
                . . . . . . . . 3 . . . . . . . 
                . . . . . . . 3 . . . . . . . . 
                . . . . . . 3 . . . . . . . . . 
                . . . . . . 3 . . . . . . . . . 
                . . . . . 3 . . . . . . 3 3 3 3 
                . . . . . 3 . . . . . 3 . . . 3 
                . . . . . 3 . . . 3 3 . . . . 3 
                . . . . . 3 . . . 3 . . . . . 3 
                . . . . . 3 . . . 3 3 . . . 3 . 
                . . . . . 3 . . . . . . . 3 . . 
                . . . . 3 . . . . . . . 3 . . . 
                . . . . 3 . . . . . . 3 . . . . 
                . . . . 3 . . . . 3 3 . . . . . 
                . . . . . 3 . 3 3 . . . . . . . 
                . . . . . 3 3 . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.passivefire)
            animation.runImageAnimation(
            udfire,
            [img`
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                . . . 2 4 5 5 8 8 8 5 4 2 . . . 
                . . . 2 4 4 5 5 5 5 5 4 2 . 4 . 
                . . . 2 4 4 4 4 4 4 4 4 4 4 . . 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                4 . . . 2 4 4 4 4 4 4 2 . . 4 . 
                . . . . 2 4 4 4 4 4 2 . . . . . 
                . . . . . 2 4 4 4 4 2 4 4 4 4 . 
                . . . . . 4 4 4 4 4 2 . . . . 4 
                . . . . 4 . 2 4 4 4 4 . . . . . 
                . . . 4 . . . 2 4 2 4 4 4 . . . 
                . . 4 . . . . . 2 . . . . . 4 . 
                . . 4 . . . 4 . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . 4 . . . . 
                `,img`
                . . . 2 4 4 5 8 8 8 8 5 2 . . . 
                . . . 2 4 4 4 5 8 8 8 5 2 2 . . 
                . . . 2 4 4 4 4 5 5 5 4 4 2 . . 
                . 4 . 2 4 4 4 4 4 4 4 4 4 2 . . 
                . . . . 4 4 4 4 4 4 4 4 4 2 . 4 
                . . . 4 2 2 4 4 4 4 4 4 4 2 . . 
                . . 4 . . 2 2 4 4 4 4 4 4 2 . . 
                . 4 4 . . . 2 2 4 4 4 4 4 2 . . 
                . 4 . . . . . 2 2 4 4 4 2 2 . . 
                4 . . . 4 . . . 2 4 4 4 2 4 . . 
                . . . . . . . . . 4 2 4 2 . . . 
                . . . . . . . 4 4 4 2 2 . . 4 . 
                . . . 4 . . . . 4 . . . . . . . 
                . . . . . . . . 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . 4 . . . 
                `,img`
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                . . . 2 4 5 5 8 8 8 5 4 2 . . . 
                . . . 2 4 4 5 5 5 5 5 4 2 . . . 
                . . . 2 4 4 4 4 4 4 4 2 2 . . . 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                4 . . . 4 4 4 4 4 4 4 2 . . 4 . 
                . . . 4 4 4 4 4 4 4 2 . . . . . 
                . . . 4 . 2 4 4 4 4 4 . . . . . 
                . . 4 . . . 2 4 4 4 2 4 4 . . . 
                . 4 4 . . . 4 4 4 2 . . . 4 . . 
                . 4 . . . . 4 2 4 2 . . . . . . 
                . . . . . . 4 . 2 . . . . . 4 . 
                . . 4 . . 4 4 . . . . . 4 . . . 
                . . . . . 4 . . . . . . . . . . 
                . . . . . 4 . . . . . . . . . . 
                . . . . . . . . . . . 4 . . . . 
                `,img`
                . . . 2 5 8 8 8 8 5 4 4 2 . . . 
                . . 2 2 5 8 8 8 5 4 4 4 2 . . . 
                . . 2 4 4 5 5 5 4 4 4 4 2 . . . 
                . . 2 4 4 4 4 4 4 4 4 4 2 . 4 . 
                4 4 4 4 4 4 4 4 4 4 4 2 . . . . 
                . 4 2 4 4 4 4 4 4 4 2 2 . . . . 
                4 . 2 4 4 4 4 4 4 4 2 . . . . . 
                4 4 2 4 4 4 4 4 2 4 4 4 . . . . 
                . 4 4 2 4 4 4 2 2 . . 4 4 4 4 . 
                . . 4 2 4 4 2 2 . . . 4 . 4 . . 
                . . . 2 4 2 4 . . . . . . 4 4 . 
                . 4 . . 2 2 4 . 4 . . . . . . . 
                . . . . . . 4 . . . . . 4 . . . 
                . . . . . . 4 4 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 4 . . . . . . . . . . . . 
                `],
            500,
            true
            )
            tiles.placeOnTile(udfire, value)
            tiles.setTileAt(value, sprites.dungeon.floorDark2)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile14`)) {
            udfire = sprites.create(img`
                . . . . . . . . 3 . . . . . . . 
                . . . . . . 3 3 3 . . . . . . . 
                . . . . 3 3 3 . 3 . . . . . . . 
                . . . . 3 . 3 . 3 . . . . . . . 
                . . . . 3 3 . . 3 . . . 3 3 3 3 
                . . . 3 . 3 . . 3 . . 3 . . . 3 
                . . . 3 . 3 . . 3 3 3 . . . . 3 
                . . . 3 . 3 3 3 3 3 3 3 3 . . 3 
                . . 3 3 3 3 . . 3 3 3 . . 3 3 . 
                . 3 3 3 3 3 3 3 3 3 3 3 . 3 3 . 
                . . 3 . 3 . . . . . . . 3 3 3 3 
                . . 3 . 3 . . . . . . 3 3 3 3 . 
                . . 3 . 3 . . . . 3 3 3 . . . . 
                . . 3 . 3 3 3 3 3 . . . . . . . 
                . 3 3 3 3 3 3 . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.fire)
            animation.runImageAnimation(
            udfire,
            [img`
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                . . . 2 4 5 5 8 8 8 5 4 2 . . . 
                . . . 2 4 4 5 5 5 5 5 4 2 . 4 . 
                . . . 2 4 4 4 4 4 4 4 4 4 4 . . 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                4 . . . 2 4 4 4 4 4 4 2 . . 4 . 
                . . . . 2 4 4 4 4 4 2 . . . . . 
                . . . . . 2 4 4 4 4 2 4 4 4 4 . 
                . . . . . 4 4 4 4 4 2 . . . . 4 
                . . . . 4 . 2 4 4 4 4 . . . . . 
                . . . 4 . . . 2 4 2 4 4 4 . . . 
                . . 4 . . . . . 2 . . . . . 4 . 
                . . 4 . . . 4 . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . 4 . . . . 
                `,img`
                . . . 2 4 4 5 8 8 8 8 5 2 . . . 
                . . . 2 4 4 4 5 8 8 8 5 2 2 . . 
                . . . 2 4 4 4 4 5 5 5 4 4 2 . . 
                . 4 . 2 4 4 4 4 4 4 4 4 4 2 . . 
                . . . . 4 4 4 4 4 4 4 4 4 2 . 4 
                . . . 4 2 2 4 4 4 4 4 4 4 2 . . 
                . . 4 . . 2 2 4 4 4 4 4 4 2 . . 
                . 4 4 . . . 2 2 4 4 4 4 4 2 . . 
                . 4 . . . . . 2 2 4 4 4 2 2 . . 
                4 . . . 4 . . . 2 4 4 4 2 4 . . 
                . . . . . . . . . 4 2 4 2 . . . 
                . . . . . . . 4 4 4 2 2 . . 4 . 
                . . . 4 . . . . 4 . . . . . . . 
                . . . . . . . . 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . 4 . . . 
                `,img`
                . . . 2 4 5 8 8 8 8 5 4 2 . . . 
                . . . 2 4 5 5 8 8 8 5 4 2 . . . 
                . . . 2 4 4 5 5 5 5 5 4 2 . . . 
                . . . 2 4 4 4 4 4 4 4 2 2 . . . 
                . . . . 2 4 4 4 4 4 4 2 . . . . 
                4 . . . 4 4 4 4 4 4 4 2 . . 4 . 
                . . . 4 4 4 4 4 4 4 2 . . . . . 
                . . . 4 . 2 4 4 4 4 4 . . . . . 
                . . 4 . . . 2 4 4 4 2 4 4 . . . 
                . 4 4 . . . 4 4 4 2 . . . 4 . . 
                . 4 . . . . 4 2 4 2 . . . . . . 
                . . . . . . 4 . 2 . . . . . 4 . 
                . . 4 . . 4 4 . . . . . 4 . . . 
                . . . . . 4 . . . . . . . . . . 
                . . . . . 4 . . . . . . . . . . 
                . . . . . . . . . . . 4 . . . . 
                `,img`
                . . . 2 5 8 8 8 8 5 4 4 2 . . . 
                . . 2 2 5 8 8 8 5 4 4 4 2 . . . 
                . . 2 4 4 5 5 5 4 4 4 4 2 . . . 
                . . 2 4 4 4 4 4 4 4 4 4 2 . 4 . 
                4 4 4 4 4 4 4 4 4 4 4 2 . . . . 
                . 4 2 4 4 4 4 4 4 4 2 2 . . . . 
                4 . 2 4 4 4 4 4 4 4 2 . . . . . 
                4 4 2 4 4 4 4 4 2 4 4 4 . . . . 
                . 4 4 2 4 4 4 2 2 . . 4 4 4 4 . 
                . . 4 2 4 4 2 2 . . . 4 . 4 . . 
                . . . 2 4 2 4 . . . . . . 4 4 . 
                . 4 . . 2 2 4 . 4 . . . . . . . 
                . . . . . . 4 . . . . . 4 . . . 
                . . . . . . 4 4 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 4 . . . . . . . . . . . . 
                `],
            500,
            true
            )
            tiles.placeOnTile(udfire, value)
            tiles.setTileAt(value, sprites.dungeon.floorDark2)
        }
    }
    if (level == 2) {
        sprites.destroyAllSpritesOfKind(SpriteKind.coin)
        snake_player.ay = 350
        tiles.setCurrentTilemap(tilemap`level8`)
        info.setLife(1)
        game.splash("Sudden death")
        tiles.placeOnRandomTile(portal_lvl_1_lvl_2, assets.tile`myTile6`)
        for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
            coins = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . f 5 5 5 5 f . . . . . 
                . . . . f 5 5 5 5 5 5 f . . . . 
                . . . f 5 5 7 7 7 7 5 5 f . . . 
                . . f 5 5 7 f 7 7 f 7 5 5 f . . 
                . . f 5 5 5 7 7 2 7 5 5 5 f . . 
                . . f 5 5 5 5 7 7 5 5 5 6 f . . 
                . . f 5 5 5 5 7 7 5 5 5 7 f . . 
                . . f 5 5 5 5 7 7 7 7 5 7 f . . 
                . . f 5 5 5 5 7 7 7 7 7 7 f . . 
                . . f 5 5 5 5 5 7 7 7 7 5 f . . 
                . . . f 5 5 5 5 5 5 5 5 5 f . . 
                . . . f 5 5 5 5 5 5 5 5 f . . . 
                . . . . f 5 5 5 5 5 5 f . . . . 
                . . . . . f f f f f f 1 . . . . 
                `, SpriteKind.coin)
            tiles.placeOnTile(coins, value)
            tiles.setTileAt(value, assets.tile`myTile16`)
        }
        tiles.placeOnTile(snake_player, tiles.getTileLocation(3, 6))
        tiles.placeOnRandomTile(portal_lvl_1_lvl_2, assets.tile`myTile11`)
    }
    if (level == 4) {
        game.gameOver(true)
        game.setGameOverEffect(true, effects.confetti)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile21`, function (sprite, location) {
    controller.moveSprite(snake_player, 0, 0)
    pause(5000)
    godzilla = sprites.create(img`
        . . . . c c c c c . . . . . . . 
        . . c c 5 5 5 5 5 c . . . . . . 
        . c 5 5 5 5 1 f 5 5 c . . . . . 
        c 5 5 5 5 5 f f 5 5 5 c . . . . 
        c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
        c c b b 1 b 5 5 5 5 5 5 c . . . 
        c 5 3 3 3 5 5 5 5 5 5 5 d c . . 
        c 5 5 5 5 5 5 5 5 5 d d d c . . 
        . c 5 5 5 5 b 5 5 5 d d d c . . 
        . . c b b c 5 5 b d d d d c . . 
        . c b b c 5 5 b b d d d d c c c 
        . c c c c c c d d d d d d d d c 
        . . . . c c b 5 5 b d d d c c . 
        . . . . c d 5 5 b b c c c . . . 
        . . . . c c c c c c c . . . . . 
        . . . . c b b b c . . . . . . . 
        `, SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    godzilla.follow(snake_player, 200)
    tiles.placeOnRandomTile(godzilla, assets.tile`myTile21`)
    godzilla.startEffect(effects.fire)
    pause(5000)
    info.changeLifeBy(-1)
    tiles.placeOnTile(snake_player, tiles.getTileLocation(3, 6))
    controller.moveSprite(snake_player)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_player.image == img`
        . . . c c c c c c c c c c . . . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        . . c c c f 6 7 7 c c c c f . . 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . . . c c c c c c . . . 
        `) {
        snake_player.setImage(img`
            . . . c c c c c c c c c c . . . 
            . . c c 6 6 7 1 1 1 1 1 6 c . . 
            . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
            . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
            c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
            c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
            . c 7 7 7 c c f 7 7 7 2 6 c . . 
            . . c c c f 6 7 7 c c c c f . . 
            . . . . f 6 7 7 c 6 7 7 7 7 f . 
            . . . . f 7 7 7 7 7 7 7 7 7 7 f 
            . . . . f 7 7 7 6 f 6 6 f 6 7 f 
            . . . . c 7 7 7 c 6 6 6 6 c 7 c 
            . . . . c 6 7 7 7 7 7 7 7 7 6 c 
            . . . . . c 7 7 7 7 7 7 7 7 c . 
            . . . . . . c 6 7 7 7 7 6 c . . 
            . . . . . . . c c c c c c . . . 
            `)
    }
    if (level > -1) {
        snake_player.setImage(img`
            . . . . . . . c c c c c c . . . 
            . . . . . . c 6 7 7 7 7 6 c . . 
            . . . . . c 7 7 7 7 7 7 7 7 c . 
            . . . . c 6 7 7 7 7 7 7 7 7 6 c 
            . . . . c 7 7 7 c 6 6 6 6 c 7 c 
            . . . . f 7 7 7 6 f 6 6 f 6 7 f 
            . . . . f 7 7 7 7 7 7 7 7 7 7 f 
            . . . . f 6 7 7 c 6 7 7 7 7 f . 
            . . c c c f 6 7 7 c c c c f . . 
            . c 7 7 7 c c f 7 7 7 2 6 c . . 
            c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
            c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
            . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
            . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
            . . c c 6 6 7 1 1 1 1 1 6 c . . 
            . . . c c c c c c c c c c . . . 
            `)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    info.changeLifeBy(-1)
    snake_player.setPosition(23, 26)
    pause(100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
controller.combos.attachCombo("u u d d l r l r b a", function () {
    info.setLife(100)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    tiles.placeOnRandomTile(snake_player, sprites.dungeon.hazardHole)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.slash)
})
controller.combos.attachCombo("lrlrud", function () {
    next_level()
})
sprites.onOverlap(SpriteKind.udplayer, SpriteKind.fire, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    tiles.placeOnTile(snake_player, tiles.getTileLocation(55, 3))
})
function reverse_jump () {
    snake_player.vy = 200
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile23`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level18`)
    tiles.placeOnTile(snake_player, tiles.getTileLocation(8, 6))
})
let godzilla: Sprite = null
let udfire: Sprite = null
let fire: Sprite = null
let level = 0
let coins: Sprite = null
let snake_player: Sprite = null
let portal_lvl_1_lvl_2: Sprite = null
info.setLife(10)
tiles.setCurrentTilemap(tilemap`level1`)
scene.setBackgroundColor(9)
portal_lvl_1_lvl_2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.portal)
snake_player = sprites.create(img`
    . . . c c c c c c . . . . . . . 
    . . c 6 7 7 7 7 6 c . . . . . . 
    . c 7 7 7 7 7 7 7 7 c . . . . . 
    c 6 7 7 7 7 7 7 7 7 6 c . . . . 
    c 7 c 6 6 6 6 c 7 7 7 c . . . . 
    f 7 6 f 6 6 f 6 7 7 7 f . . . . 
    f 7 7 7 7 7 7 7 7 7 7 f . . . . 
    . f 7 7 7 7 6 c 7 7 6 f . . . . 
    . . f c c c c 7 7 6 f c c c . . 
    . . c 6 2 7 7 7 f c c 7 7 7 c . 
    . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
    . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
    . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
    . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
    . . c 6 1 1 1 1 1 7 6 6 c c . . 
    . . . c c c c c c c c c c . . . 
    `, SpriteKind.Player)
controller.moveSprite(snake_player, 100, 0)
snake_player.ay = 350
for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
    coins = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f 5 5 5 5 f . . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 7 7 7 7 5 5 f . . . 
        . . f 5 5 7 f 7 7 f 7 5 5 f . . 
        . . f 5 5 5 7 7 2 7 5 5 5 f . . 
        . . f 5 5 5 5 7 7 5 5 5 6 f . . 
        . . f 5 5 5 5 7 7 5 5 5 7 f . . 
        . . f 5 5 5 5 7 7 7 7 5 7 f . . 
        . . f 5 5 5 5 7 7 7 7 7 7 f . . 
        . . f 5 5 5 5 5 7 7 7 7 5 f . . 
        . . . f 5 5 5 5 5 5 5 5 5 f . . 
        . . . f 5 5 5 5 5 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . . f f f f f f 1 . . . . 
        `, SpriteKind.coin)
    tiles.placeOnTile(coins, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
tiles.placeOnRandomTile(portal_lvl_1_lvl_2, assets.tile`myTile7`)
animation.runImageAnimation(
portal_lvl_1_lvl_2,
[img`
    ...........3........
    .3..3...8........3..
    ....................
    ......fffffff.......
    .3..ffaaaaaaaff.....
    ...ffabbbbbbbaff....
    ...fabfffffffbaf.3..
    ..fabfc88888cfbaf...
    ..fabf8ccccc8fbaf...
    8.fabf8ccccc8fbaf...
    ..fabf8ccccc8fbaf...
    ..fabf8ccccc8fbaf.3.
    ..fabf8ccccc8fbaf...
    ..fabfc88888cfbaf...
    ...fabfffffffbaf....
    ...ffabbbbbbbaff....
    ....ffaaaaaaaff.....
    .3....fffffff.....3.
    ....................
    ..........3.........
    `,img`
    a..a......8..a......
    ......8............b
    .............8......
    a..8..fffffff....a..
    ....ffaaaaaaaff.....
    ...ffafffffffaff....
    ...fafbbbbbbbfaf...8
    ..fafbcfffffcbfaf...
    ..fafbfcccccfbfaf...
    ..fafbfc888cfbfaf..a
    ..fafbfc8c8cfbfaf...
    ..fafbfc888cfbfaf.8.
    ..fafbfcccccfbfaf...
    ..fafbcfffffcbfaf...
    a..fafbbbbbbbfaf...b
    ...ffafffffffaff....
    ....ffaaaaaaaff....a
    .b....fffffff.......
    .............a.aa...
    ..........b....a....
    `],
500,
true
)
forever(function () {
    scene.cameraFollowSprite(snake_player)
    game.setGameOverMessage(false, "GAME OVER!")
})
