<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Game;
use App\Models\User;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // login
    public function login() {
        return view('login', [
            'message' => ''
        ]);
    }

    // authorize
    public function auth(Request $request) {
        $admin = Admin::where('username', $request->username)
                ->where('password', $request->password)
                ->first();

        if ($admin) {
            $admin->updated_at = date('Y-m-d H:i:s');
            $admin->save();

            $request->session()->regenerate();

            return redirect('/XX-module-a/admin');
        } else {
            return view('login', ['message' => 'Username or password is incorrect!']);
        }
    }

    // home
    public function home() {
        return view('home', [
            'admins' => Admin::all(),
            'games' => Game::all(),
            'users' => User::all(),
        ]);
    }
    public function game_delete($slug) {
        $game = Game::where('slug', $slug)->first();
        $game->delete();
        
        return response('/XX-module-a/admin');
    }
}
