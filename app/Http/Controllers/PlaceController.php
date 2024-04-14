<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
//        $location = $request->query('location');
//        $query = Place::query();
//        if ($location) {
//            $query->where('location', $location);
//        }

        return Inertia::render('Places/Index', [
            'places' => Place::with('name')->latest()->get(),
//            'random_place' => $query->orderByRaw('RAND()')->first(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Places/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'open_at' => 'nullable|date_format:H:i',
            'close_at' => 'nullable|date_format:H:i',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'parking_fee' => 'nullable|boolean',
        ]);

        $request->user()->places()->create($validated);

        return to_route('places.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Place $place)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Place $place)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        //
    }
}
