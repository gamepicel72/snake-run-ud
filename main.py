@namespace
class SpriteKind:
    costume = SpriteKind.create()
    coin = SpriteKind.create()
    portal = SpriteKind.create()
    fire = SpriteKind.create()
    passivefire = SpriteKind.create()
    udplayer = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    info.change_score_by(1)
    sprites.destroy(otherSprite)
sprites.on_overlap(SpriteKind.udplayer, SpriteKind.coin, on_on_overlap)

def on_combos_attach_combo():
    global coins
    tiles.set_current_tilemap(tilemap("""
        level17
    """))
    for value in tiles.get_tiles_by_type(assets.tile("""
        myTile5
    """)):
        coins = sprites.create(img("""
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
            """),
            SpriteKind.coin)
        tiles.place_on_tile(coins, value)
        tiles.set_tile_at(value, sprites.dungeon.floor_dark2)
controller.combos.attach_combo("ddlldduu", on_combos_attach_combo)

def on_overlap_tile(sprite2, location):
    info.set_life(10)
    next_level()
scene.on_overlap_tile(SpriteKind.udplayer,
    assets.tile("""
        myTile6
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite3, location2):
    snake_player.set_kind(SpriteKind.udplayer)
    snake_player.ay = -300
    snake_player.set_position(55, 4)
    snake_player.set_image(img("""
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
    """))
    controller.move_sprite(snake_player, 100, 0)
    tiles.place_on_tile(snake_player, tiles.get_tile_location(55, 3))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile13
    """),
    on_overlap_tile2)

def on_a_pressed():
    if snake_player.vy == 0 and snake_player.kind() == SpriteKind.player:
        snake_player.vy = -200
    if snake_player.kind() == SpriteKind.udplayer and snake_player.vy == 0:
        reverse_jump()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile3(sprite4, location3):
    info.change_life_by(-1)
    snake_player.set_position(23, 26)
    pause(100)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_lava0,
    on_overlap_tile3)

def on_overlap_tile4(sprite5, location4):
    info.set_life(10)
    next_level()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile7
    """),
    on_overlap_tile4)

def on_left_pressed():
    if level == 3 or (level == 2 or level == 0):
        snake_player.set_image(img("""
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
        """))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap2(sprite6, otherSprite2):
    info.change_life_by(-1)
    tiles.place_on_tile(snake_player, tiles.get_tile_location(8, 6))
sprites.on_overlap(SpriteKind.player, SpriteKind.fire, on_on_overlap2)

def next_level():
    global level, coins, fire2, udfire
    level += 1
    if level == 1:
        sprites.destroy_all_sprites_of_kind(SpriteKind.coin)
        tiles.set_current_tilemap(tilemap("""
            level3
        """))
        tiles.place_on_tile(snake_player, tiles.get_tile_location(8, 5))
        tiles.place_on_random_tile(portal_lvl_1_lvl_2, assets.tile("""
            myTile6
        """))
        scene.set_background_color(1)
        sprites.destroy_all_sprites_of_kind(SpriteKind.udplayer)
        for value2 in tiles.get_tiles_by_type(assets.tile("""
            myTile5
        """)):
            coins = sprites.create(img("""
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
                """),
                SpriteKind.coin)
            tiles.place_on_tile(coins, value2)
            tiles.set_tile_at(value2, sprites.dungeon.floor_dark2)
        for value3 in tiles.get_tiles_by_type(assets.tile("""
            myTile11
        """)):
            fire2 = sprites.create(img("""
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
                """),
                SpriteKind.fire)
            animation.run_image_animation(fire2,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                500,
                True)
            tiles.place_on_tile(fire2, value3)
            tiles.set_tile_at(value3, sprites.dungeon.floor_dark2)
        for value4 in tiles.get_tiles_by_type(assets.tile("""
            myTile12
        """)):
            fire2 = sprites.create(img("""
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
                """),
                SpriteKind.passivefire)
            animation.run_image_animation(fire2,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                500,
                True)
            tiles.place_on_tile(fire2, value4)
            tiles.set_tile_at(value4, sprites.dungeon.floor_dark2)
        for value5 in tiles.get_tiles_by_type(assets.tile("""
            myTile15
        """)):
            udfire = sprites.create(img("""
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
                """),
                SpriteKind.passivefire)
            animation.run_image_animation(udfire,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                500,
                True)
            tiles.place_on_tile(udfire, value5)
            tiles.set_tile_at(value5, sprites.dungeon.floor_dark2)
        for value6 in tiles.get_tiles_by_type(assets.tile("""
            myTile14
        """)):
            udfire = sprites.create(img("""
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
                """),
                SpriteKind.fire)
            animation.run_image_animation(udfire,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                500,
                True)
            tiles.place_on_tile(udfire, value6)
            tiles.set_tile_at(value6, sprites.dungeon.floor_dark2)
    if level == 2:
        sprites.destroy_all_sprites_of_kind(SpriteKind.coin)
        tiles.set_current_tilemap(tilemap("""
            level8
        """))
        info.set_life(1)
        game.splash("Sudden death")
        for value7 in tiles.get_tiles_by_type(assets.tile("""
            myTile5
        """)):
            coins = sprites.create(img("""
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
                """),
                SpriteKind.coin)
            tiles.place_on_tile(coins, value7)
            tiles.set_tile_at(value7, assets.tile("""
                myTile16
            """))
        tiles.place_on_tile(snake_player, tiles.get_tile_location(3, 6))
        tiles.place_on_random_tile(portal_lvl_1_lvl_2, assets.tile("""
            myTile7
        """))
        snake_player.set_kind(SpriteKind.player)
        snake_player.ay = 350
        snake_player.set_image(img("""
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
        """))
        controller.move_sprite(snake_player, 100, 0)
        pause(500)
    if level == 3:
        game.game_over(True)
        game.set_game_over_effect(True, effects.confetti)

def on_overlap_tile5(sprite7, location5):
    global godzilla
    controller.move_sprite(snake_player, 0, 0)
    pause(5000)
    godzilla = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    godzilla.follow(snake_player, 200)
    tiles.place_on_random_tile(godzilla, assets.tile("""
        myTile21
    """))
    godzilla.start_effect(effects.fire)
    pause(5000)
    info.change_life_by(-1)
    tiles.place_on_tile(snake_player, tiles.get_tile_location(3, 6))
    controller.move_sprite(snake_player)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile21
    """),
    on_overlap_tile5)

def on_right_pressed():
    if level == 3 or (level == 2 or level == 0):
        snake_player.set_image(img("""
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
        """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_overlap_tile6(sprite8, location6):
    info.change_life_by(-1)
    snake_player.set_position(23, 26)
    pause(100)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile17
    """),
    on_overlap_tile6)

def on_on_overlap3(sprite9, otherSprite3):
    info.change_score_by(1)
    sprites.destroy(otherSprite3)
sprites.on_overlap(SpriteKind.player, SpriteKind.coin, on_on_overlap3)

def on_combos_attach_combo2():
    info.set_life(100)
controller.combos.attach_combo("u u d d l r l r b a", on_combos_attach_combo2)

def on_overlap_tile7(sprite10, location7):
    tiles.place_on_random_tile(snake_player, sprites.dungeon.hazard_hole)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
    """),
    on_overlap_tile7)

def on_life_zero():
    game.game_over(False)
    game.set_game_over_effect(False, effects.slash)
info.on_life_zero(on_life_zero)

def on_combos_attach_combo3():
    next_level()
controller.combos.attach_combo("lrlrud", on_combos_attach_combo3)

def on_on_overlap4(sprite11, otherSprite4):
    info.change_life_by(-1)
    tiles.place_on_tile(snake_player, tiles.get_tile_location(55, 3))
sprites.on_overlap(SpriteKind.udplayer, SpriteKind.fire, on_on_overlap4)

def reverse_jump():
    snake_player.vy = 200

def on_overlap_tile8(sprite12, location8):
    tiles.set_current_tilemap(tilemap("""
        level18
    """))
    tiles.place_on_tile(snake_player, tiles.get_tile_location(8, 6))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile23
    """),
    on_overlap_tile8)

godzilla: Sprite = None
udfire: Sprite = None
fire2: Sprite = None
level = 0
coins: Sprite = None
snake_player: Sprite = None
portal_lvl_1_lvl_2: Sprite = None
info.set_life(10)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
scene.set_background_color(9)
portal_lvl_1_lvl_2 = sprites.create(img("""
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
    """),
    SpriteKind.portal)
snake_player = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(snake_player, 100, 0)
snake_player.ay = 350
for value8 in tiles.get_tiles_by_type(assets.tile("""
    myTile5
""")):
    coins = sprites.create(img("""
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
        """),
        SpriteKind.coin)
    tiles.place_on_tile(coins, value8)
    tiles.set_tile_at(value8, assets.tile("""
        transparency16
    """))
tiles.place_on_random_tile(portal_lvl_1_lvl_2, assets.tile("""
    myTile7
"""))
animation.run_image_animation(portal_lvl_1_lvl_2,
    [img("""
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
        """),
        img("""
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
        """)],
    500,
    True)

def on_forever():
    scene.camera_follow_sprite(snake_player)
    game.set_game_over_message(False, "GAME OVER!")
forever(on_forever)
