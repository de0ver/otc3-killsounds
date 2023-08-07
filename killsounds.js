UI.AddCheckbox("Enable killsounds");
var screen_size = Global.GetScreenSize();
UI.AddSliderInt("Width", 1, screen_size[0]);
UI.AddSliderInt("Height", 1, screen_size[1]);
UI.AddSliderInt("X pos", 1, screen_size[0]);
UI.AddSliderInt("Y pos", 1, screen_size[1]);
var checker = UI.GetValue("Script Items", "Enable killsounds");
var count = 0;
var i = 0;
var j = 0;
localplayer_index = Entity.GetLocalPlayer();
	
function killcount()
{	
    attacker = Event.GetInt("attacker");
	victim = Event.GetInt("userid");
    attacker_index = Entity.GetEntityFromUserID(attacker);
	victim_index = Entity.GetEntityFromUserID(victim);
	attacker_me = Entity.IsLocalPlayer(attacker_index);
	victim_enemy = Entity.IsEnemy(victim_index);
	name = Entity.GetName(Entity.GetWeapon(localplayer_index));
	started = Globals.Realtime();
	
	var killsound = [ "",
    "C:\\male\\firstblood1_ultimate.wav",
    "C:\\male\\doublekill1_ultimate.wav",
    "C:\\male\\triplekill_ultimate.wav",
    "C:\\male\\holyshit.wav",
    "C:\\male\\rampage.wav",
    "C:\\male\\godlike.wav",
    "C:\\male\\multikill.wav",
    "C:\\male\\monsterkill.wav",
    ];
	
	if (checker == 1) {
	if (attacker_me) {
		if (name == "bayonet" || name == "flip knife" || name == "gut knife" || name == "karambit" || name == "m9 bayonet" ||
			name == "falchion knife" || name == "bowie knife" || name == "butterfly knife" || name == "shadow daggers" ||
			name == "ursus knife" || name == "navaja knife" || name == "stiletto knife" || name == "skeleton knife" ||
			name == "huntsman knife" || name == "talon knife" || name == "classic knife" || name == "paracord knife" ||
			name == "survival knife" || name == "nomad knife" || name == "knife") {
			j = 1;
		}
	headshot = Event.GetInt("headshot");
	count++;
	i = 0;
	}
	
	if (count > 8) {
		count = 8;
	}
	
	if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) !== Entity.GetLocalPlayer()) return;
	if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) return;
	
	if (headshot == 1) {
		Sound.Play("C:\\male\\headshot2_ultimate.wav");
	}
	if (Entity.IsAlive(localplayer_index) && headshot != 1 && j != 1) {
	if (count > 0) {
        Sound.Play(killsound[count]);
        }
	}
	if (j == 1) {
		Sound.Play("C:\\male\\knifed.wav");
	}
	}
}

function reset()
{
	count = 0;
}

Global.RegisterCallback("player_death", "killcount");
Global.RegisterCallback("round_start", "reset");
Global.RegisterCallback("player_connect_full", "reset");
Global.RegisterCallback("client_disconnect", "reset");
Global.RegisterCallback("round_prestart", "reset");

function on_draw() 
{	
	width = UI.GetValue("Script Items", "Width");
	height = UI.GetValue("Script Items", "Height");
	x_coord = UI.GetValue("Script Items", "X pos");
	y_coord = UI.GetValue("Script Items", "Y pos");
	var picture = [ "",
	"C:\\male\\xeon_kill_1.png",
	"C:\\male\\xeon_kill_2.png",
	"C:\\male\\xeon_kill_3.png",
	"C:\\male\\xeon_kill_4.png",
	"C:\\male\\xeon_kill_5.png",
	"C:\\male\\xeon_kill_6.png",
	"C:\\male\\xeon_kill_7.png",
	"C:\\male\\xeon_kill_8.png",
	];
	
	if (Entity.IsAlive(localplayer_index) && headshot != 1 && j != 1) {
	if (count > 0) {
	render = Render.AddTexture(picture[count]);
	if (i < 256) {
	Render.TexturedRect(x_coord, y_coord, width, height, render);
	i++;
	}
	}
	}
	if (Entity.IsAlive(localplayer_index) && headshot == 1) {
	head_shot = Render.AddTexture("C:\\male\\xeon_kill_headshot.png");
	if (i < 256) {
	Render.TexturedRect(x_coord, y_coord, width, height, head_shot);
	i++;
	}
	}
	if (j == 1) {
	knife_kill = Render.AddTexture("C:\\male\\xeon_kill_knife.png");
	if (i < 256) {
	Render.TexturedRect(x_coord, y_coord, width, height, knife_kill);
	i++;
	if (i == 255) {
		j = 0;
	}
	}
	}
}

Global.RegisterCallback("Draw", "on_draw");