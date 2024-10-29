var screen_size = Global.GetScreenSize();
var kill_count = 0;
var render_time = 0;
var knife_kill = false;
const killsound = [ "",
    "C:\\male\\firstblood1_ultimate.wav",
    "C:\\male\\doublekill1_ultimate.wav",
    "C:\\male\\triplekill_ultimate.wav",
    "C:\\male\\holyshit.wav",
    "C:\\male\\rampage.wav",
    "C:\\male\\godlike.wav",
    "C:\\male\\multikill.wav",
    "C:\\male\\monsterkill.wav",
    ];
const picture = [ "",
	"C:\\male\\xeon_kill_1.png",
	"C:\\male\\xeon_kill_2.png",
	"C:\\male\\xeon_kill_3.png",
	"C:\\male\\xeon_kill_4.png",
	"C:\\male\\xeon_kill_5.png",
	"C:\\male\\xeon_kill_6.png",
	"C:\\male\\xeon_kill_7.png",
	"C:\\male\\xeon_kill_8.png",
	];
const knife_names = [
	"bayonet", "flip knife", "gut knife", "karambit",
	"m9 bayonet", "falchion knife", "bowie knife", "butterfly knife",
	"shadow daggers", "ursus knife", "navaja knife", "stiletto knife",
	"skeleton knife", "huntsman knife", "talon knife", "classic knife",
	"paracord knife", "survival knife", "nomad knife", "knife",
];
const headshot_arr = ["C:\\male\\headshot2_ultimate.wav", "C:\\male\\xeon_kill_headshot.png"];
const knife_arr = ["C:\\male\\knifed.wav", "C:\\male\\xeon_kill_knife.png"];

UI.AddCheckbox("Enable killsounds");
UI.AddSliderInt("Width", 1, screen_size[0]);
UI.AddSliderInt("Height", 1, screen_size[1]);
UI.AddSliderInt("X pos", 1, screen_size[0]);
UI.AddSliderInt("Y pos", 1, screen_size[1]);
var enabled = UI.GetValue("Script Items", "Enable killsounds");

function killcount()
{	
    var attacker = Event.GetInt("attacker");
    var attacker_index = Entity.GetEntityFromUserID(attacker);
	var attacker_me = Entity.IsLocalPlayer(attacker_index);
	var weapon_name = Entity.GetName(Entity.GetWeapon(localplayer_index));
	
	if (enabled) 
	{
		if (attacker_me) 
		{
			knife_kill = knife_names.includes(weapon_name);
			headshot = Event.GetInt("headshot");
			kill_count++;
			render_time = 0;
		}
	
		if (kill_count > 8)
			kill_count = 8;
		
		if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) !== Entity.GetLocalPlayer()) return;
		if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) return;
		
		if (headshot)
			Sound.Play(headshot_arr[0]);
		
		if (Entity.IsAlive(localplayer_index) && !headshot && !knife_kill) 
		{
			if (kill_count > 0) 
				Sound.Play(killsound[count]);
		}

		if (knife_kill) 
			Sound.Play(knife_arr[0]);
	}
}

function on_draw() 
{	
	var width = UI.GetValue("Script Items", "Width");
	var height = UI.GetValue("Script Items", "Height");
	var x_coord = UI.GetValue("Script Items", "X pos");
	var y_coord = UI.GetValue("Script Items", "Y pos");
	
	if (Entity.IsAlive(localplayer_index) && !headshot && !knife_kill) 
	{
		if (count > 0) 
		{
			var render_pic = Render.AddTexture(picture[count]);
			if (render_time < 256) 
			{
				Render.TexturedRect(x_coord, y_coord, width, height, render_pic);
				render_time++;
			}
		}
	}

	if (Entity.IsAlive(localplayer_index) && headshot) 
	{
		var headshot_pic = Render.AddTexture(headshot_arr[1]);
		if (render_time < 256) 
		{
			Render.TexturedRect(x_coord, y_coord, width, height, headshot_pic);
			render_time++;
		}
	}

	if (knife_kill) 
	{
		var knife_pic = Render.AddTexture(knife_arr[1]);
		if (render_time < 256) 
		{
			Render.TexturedRect(x_coord, y_coord, width, height, knife_pic);
			render_time++;
			if (render_time == 255)
				j = 0;
		}
	}
}

function reset()
{
	return kill_count = 0;
}

Global.RegisterCallback("player_death", "killcount");
Global.RegisterCallback("round_start", "reset");
Global.RegisterCallback("player_connect_full", "reset");
Global.RegisterCallback("client_disconnect", "reset");
Global.RegisterCallback("round_prestart", "reset");

Global.RegisterCallback("Draw", "on_draw");